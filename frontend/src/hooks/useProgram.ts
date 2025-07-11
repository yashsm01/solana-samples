"use client";

import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { IDL, PROGRAM_ID } from "@/types/program";

export function useProgram() {
  const connection = useMemo(() => {
    const conn = new Connection("https://api.devnet.solana.com");
    console.log("Using network: devnet");
    return conn;
  }, []);

  const getProvider = useCallback(async () => {
    if (typeof window === "undefined" || !(window as any).solana) {
      throw new Error("Phantom wallet not found");
    }

    const wallet = (window as any).solana;
    const provider = new AnchorProvider(
      connection,
      wallet,
      { preflightCommitment: "processed" }
    );

    return provider;
  }, [connection]);

            const getProgram = useCallback(async () => {
    try {
      const provider = await getProvider();
      console.log("Creating program with ID:", PROGRAM_ID);

      // Validate inputs before using them
      if (!PROGRAM_ID || typeof PROGRAM_ID !== 'string') {
        throw new Error(`Invalid PROGRAM_ID: ${PROGRAM_ID}`);
      }

      console.log("Creating PublicKey from:", PROGRAM_ID);
      const programId = new PublicKey(PROGRAM_ID);
      console.log("PublicKey created:", programId.toString());

            // Add program ID to IDL (required by Anchor)
      const idlWithAddress = {
        ...IDL,
        address: PROGRAM_ID
      };

                  console.log("🏗️ Creating Program with IDL:", idlWithAddress);
      console.log("🔗 Provider ready:", provider ? "✅ Yes" : "❌ No");
      console.log("📄 IDL has address:", idlWithAddress?.address ? "✅ Yes" : "❌ No");

      const program = new Program(idlWithAddress, provider);
      console.log("✅ Program created successfully");
      console.log("🆔 Program ID from program:", program.programId.toString());
      return program;
    } catch (error) {
      console.error("Failed to create program:", error);
      throw error;
    }
  }, [getProvider]);

    const sendSOL = useCallback(async (recipient: string, amount: number) => {
    // KEY INSIGHT: Web wallets (like Phantom) handle signing automatically
    // Unlike tests that use .signers([sender]), web implementation uses .signers([])
    console.log("🚀 === Starting sendSOL ===");
    console.log("📧 Recipient type:", typeof recipient, "value:", recipient);
    console.log("💰 Amount type:", typeof amount, "value:", amount);

    // Early validation
    if (!recipient) {
      throw new Error("Recipient is required");
    }
    if (!amount || amount <= 0) {
      throw new Error("Valid amount is required");
    }

              try {
       console.log("🔄 Getting program and provider...");

       const program = await getProgram();
       const provider = await getProvider();

       console.log("✅ === Program and Provider obtained ===");
       console.log("📋 Program object:", program ? "✅ Defined" : "❌ Undefined");
       console.log("🔗 Provider object:", provider ? "✅ Defined" : "❌ Undefined");
       console.log("🎯 Program methods available:", program?.methods ? Object.keys(program.methods) : "❌ No methods");

      const senderPublicKey = provider.wallet.publicKey;
      console.log("Sender public key:", senderPublicKey);

      if (!senderPublicKey) {
        throw new Error("Sender public key is undefined");
      }

            // Validate and create recipient PublicKey
      console.log("Raw recipient string:", typeof recipient, recipient);
      if (!recipient || typeof recipient !== 'string' || recipient.trim() === '') {
        throw new Error(`Invalid recipient: ${recipient}`);
      }

      let recipientPublicKey;
      try {
        recipientPublicKey = new PublicKey(recipient.trim());
        console.log("Recipient public key:", recipientPublicKey.toString());
      } catch (error) {
        console.error("Failed to create recipient PublicKey:", error);
        throw new Error(`Invalid recipient address: ${recipient}`);
      }

      // Validate and create lamports
      console.log("Raw amount:", typeof amount, amount);
      if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
        throw new Error(`Invalid amount: ${amount}`);
      }

      const lamportsAmount = Math.floor(amount * LAMPORTS_PER_SOL);
      console.log("Lamports amount (number):", lamportsAmount);

      if (!lamportsAmount || lamportsAmount <= 0) {
        throw new Error(`Invalid lamports amount: ${lamportsAmount}`);
      }

      let lamports;
      try {
        lamports = new BN(lamportsAmount);
        console.log("BN lamports:", lamports.toString());
      } catch (error) {
        console.error("Failed to create BN:", error);
        throw new Error(`Failed to create BN from: ${lamportsAmount}`);
      }

      console.log("=== Program Debug Info ===");
      console.log("Program ID:", PROGRAM_ID);
      console.log("Sender:", senderPublicKey?.toString());
      console.log("Recipient:", recipientPublicKey?.toString());
      console.log("Amount (SOL):", amount);
      console.log("Amount (lamports):", lamports?.toString());
      console.log("SystemProgram.programId:", SystemProgram.programId?.toString());

      // Check program and methods
      console.log("Program object:", program);
      console.log("Program methods:", program?.methods ? Object.keys(program.methods) : 'undefined');

      if (!program || !program.methods) {
        throw new Error("Program or program.methods is undefined");
      }

      if (!program.methods.solTransfer) {
        throw new Error("solTransfer method not found on program");
      }

                                console.log("🔨 === Creating transaction ===");
       console.log("🔢 About to call program.methods.solTransfer with lamports:", lamports?.toString());
       console.log("👤 Sender PublicKey:", senderPublicKey?.toString());
       console.log("🎯 Recipient PublicKey:", recipientPublicKey?.toString());
       console.log("🛠️ SystemProgram ID:", SystemProgram.programId?.toString());

              // Transaction creation (Web wallet automatically handles signing)
       let tx;
       try {
         console.log("🔥 Creating transaction with web wallet signing...");

         tx = await program.methods
          .solTransfer(lamports)
          .accounts({
            sender: senderPublicKey,
            recipient: recipientPublicKey,
            systemProgram: SystemProgram.programId, // REMOVE THIS LINE!
          })
          .signers([]) // Web wallet handles signing
          .rpc();

         console.log("🎉 Transaction completed successfully!");
         console.log("📋 Transaction signature:", tx);
         console.log("🔗 View on explorer:", `https://explorer.solana.com/tx/${tx}?cluster=devnet`);

       } catch (txError) {
         console.error("❌ Transaction creation failed:", txError);
         console.error("Error details:", (txError as Error).message);
         throw txError;
       }

      console.log("🏆 Final transaction signature:", tx);
      toast.success(`🎉 SOL transferred via custom program! View on Explorer: ${tx.slice(0, 8)}...`);

      return tx;
    } catch (error) {
      console.error("Transfer failed:", error);
      toast.error("Transfer failed: " + (error as Error).message);
      throw error;
    }
  }, [getProgram, getProvider]);

  const checkBalance = useCallback(async (address: string) => {
    try {
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error("Failed to check balance:", error);
      return 0;
    }
  }, [connection]);

  return {
    sendSOL,
    checkBalance,
    getProgram,
    getProvider,
  };
}
