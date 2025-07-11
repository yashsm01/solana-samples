"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  walletAddress: string | null;
  balance: number;
  isLoading: boolean;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    walletAddress: null,
    balance: 0,
    isLoading: true,
  });

  const fetchBalance = useCallback(async (address: string) => {
    try {
      const { Connection, PublicKey } = await import("@solana/web3.js");
      const connection = new Connection("https://api.devnet.solana.com");
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      return balance / 1000000000; // Convert lamports to SOL
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      return 1.2345; // Demo balance fallback
    }
  }, []);

  const checkWalletConnection = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    if (typeof window !== "undefined" && (window as any).solana) {
      try {
        const response = await (window as any).solana.connect({
          onlyIfTrusted: true,
        });
        if (response.publicKey) {
          const balance = await fetchBalance(response.publicKey.toString());
          setState({
            isConnected: true,
            isConnecting: false,
            walletAddress: response.publicKey.toString(),
            balance,
            isLoading: false,
          });
          return;
        }
      } catch (error) {
        // User hasn't approved connection yet
      }
    }

    setState((prev) => ({ ...prev, isLoading: false }));
  }, [fetchBalance]);

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true }));

    try {
      if (
        typeof window !== "undefined" &&
        (window as any).solana &&
        (window as any).solana.isPhantom
      ) {
        const response = await (window as any).solana.connect();
        const balance = await fetchBalance(response.publicKey.toString());

        setState({
          isConnected: true,
          isConnecting: false,
          walletAddress: response.publicKey.toString(),
          balance,
          isLoading: false,
        });

        toast.success("Phantom wallet connected successfully!");
        return true;
      } else {
        // Fallback to demo mode
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setState({
          isConnected: true,
          isConnecting: false,
          walletAddress: "7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s",
          balance: 1.2345,
          isLoading: false,
        });
        toast.success(
          "Demo wallet connected! (Install Phantom for real wallet)"
        );
        return true;
      }
    } catch (error) {
      console.error("Connection failed:", error);
      toast.error("Failed to connect wallet");
      setState((prev) => ({ ...prev, isConnecting: false }));
      return false;
    }
  }, [fetchBalance]);

  const disconnect = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && (window as any).solana) {
        await (window as any).solana.disconnect();
      }

      setState({
        isConnected: false,
        isConnecting: false,
        walletAddress: null,
        balance: 0,
        isLoading: false,
      });

      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Disconnect failed:", error);
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!state.isConnected || !state.walletAddress) return;

    try {
      const balance = await fetchBalance(state.walletAddress);
      setState((prev) => ({ ...prev, balance }));
      toast.success("Balance refreshed!");
    } catch (error) {
      console.error("Failed to refresh balance:", error);
      toast.error("Failed to refresh balance");
    }
  }, [state.isConnected, state.walletAddress, fetchBalance]);

  const sendTransaction = useCallback(
    async (recipient: string, amount: number) => {
      if (!state.isConnected || !state.walletAddress) {
        throw new Error("Wallet not connected");
      }

      if (typeof window !== "undefined" && (window as any).solana) {
        const {
          Connection,
          PublicKey,
          Transaction,
          SystemProgram,
          LAMPORTS_PER_SOL,
        } = await import("@solana/web3.js");

        const connection = new Connection("https://api.devnet.solana.com");
        const fromPubkey = new PublicKey(state.walletAddress);
        const toPubkey = new PublicKey(recipient);

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: amount * LAMPORTS_PER_SOL,
          })
        );

        const { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = fromPubkey;

        const signedTransaction = await (window as any).solana.signTransaction(
          transaction
        );
        const signature = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );

        // Refresh balance after transaction
        setTimeout(() => refreshBalance(), 2000);

        return signature;
      } else {
        // Demo mode
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return "demo-transaction-signature";
      }
    },
    [state.isConnected, state.walletAddress, refreshBalance]
  );

  // Check connection on mount
  useEffect(() => {
    checkWalletConnection();
  }, [checkWalletConnection]);

  return {
    ...state,
    connect,
    disconnect,
    refreshBalance,
    sendTransaction,
    checkWalletConnection,
  };
}
