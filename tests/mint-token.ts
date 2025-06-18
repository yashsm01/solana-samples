import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TokenExample } from "../target/types/token_example";
import {
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddress,
  getMint,
  getAccount,
} from "@solana/spl-token";

describe("token-example", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TokenExample as Program<TokenExample>;
  const [mint, mintBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("mint")],
    program.programId,
  );

  const [token, tokenBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("token")],
    program.programId,
  );

  it("Is initialized!", async () => {
    try {
      // Check if mint already exists
      let mintAccount;
      try {
        mintAccount = await getMint(
          program.provider.connection,
          mint,
          "confirmed",
          TOKEN_2022_PROGRAM_ID,
        );
        console.log("Mint already exists:", mintAccount);
        return; // Skip creation if already exists
      } catch (error) {
        // Mint doesn't exist, proceed with creation
        console.log("Mint doesn't exist, creating new one...");
      }

      const tx = await program.methods
        .createMint()
        .accounts({
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc({ commitment: "confirmed", skipPreflight: true });

      console.log("Your transaction signature", tx);

      mintAccount = await getMint(
        program.provider.connection,
        mint,
        "confirmed",
        TOKEN_2022_PROGRAM_ID,
      );

      console.log("Mint Account", mintAccount);
    } catch (error) {
      console.error("Error in mint creation:", error);
      throw error;
    }
  });

  it("Create token account", async () => {
    try {
      // Check if token account already exists
      let tokenAccount;
      try {
        tokenAccount = await getAccount(
          program.provider.connection,
          token,
          "confirmed",
          TOKEN_2022_PROGRAM_ID,
        );
        console.log("Token account already exists:", tokenAccount);
        return; // Skip creation if already exists
      } catch (error) {
        // Token account doesn't exist, proceed with creation
        console.log("Token account doesn't exist, creating new one...");
      }

      const tx = await program.methods
        .createTokenAccount()
        .accounts({
          mint: mint,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc({ commitment: "confirmed", skipPreflight: true });

      console.log("Your transaction signature", tx);

      tokenAccount = await getAccount(
        program.provider.connection,
        token,
        "confirmed",
        TOKEN_2022_PROGRAM_ID,
      );

      console.log("Token Account", tokenAccount);
    } catch (error) {
      console.error("Error in token account creation:", error);
      throw error;
    }
  });
});
