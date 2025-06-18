import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Cpi } from "../target/types/cpi";
import { SystemProgram } from "@solana/web3.js";

describe("mint-token", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.cpi as Program<Cpi>;
  const transferAmount = 1000000000;
  const sender = anchor.web3.Keypair.generate();
  const recipient = anchor.web3.Keypair.generate();

  it("SOL Transfer Anchor", async () => {
    const provider = anchor.getProvider();
    const sig = await provider.connection.requestAirdrop(sender.publicKey, 2 * transferAmount);
    await provider.connection.confirmTransaction(sig);

    const tx = await program.methods
      .solTransfer(new BN(transferAmount))
      .accounts({
        sender: sender.publicKey,
        recipient: recipient.publicKey
      })
      .signers([sender])
      .rpc();
      console.log(`\nTransaction Signature:` + `https://solana.fm/tx/${tx}?cluster=devnet-solana`);
  });
});
