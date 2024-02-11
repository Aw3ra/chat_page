import { j as json } from "../../../../../chunks/index.js";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { p as public_env } from "../../../../../chunks/shared-server.js";
const connection = new Connection(public_env.PUBLIC_RPC_URL);
async function POST({ request }) {
  try {
    const {
      amount = 0,
      from = ""
    } = await request.json();
    if (!from) {
      return json({ error: "from is required" });
    }
    if (!amount || amount === 0) {
      return json({ error: "amount is required" });
    }
    const total = amount * LAMPORTS_PER_SOL;
    const lamports = Math.ceil(total);
    const latestBlockhash = await connection.getLatestBlockhash();
    const toPubkey = new PublicKey(process.env.TO_PUBLIC_ADDRESS);
    const instructions = [];
    const fromPubkey = new PublicKey(from);
    instructions.push(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports
      })
    );
    const messageV0 = new TransactionMessage({
      instructions,
      payerKey: fromPubkey,
      recentBlockhash: latestBlockhash.blockhash
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);
    const serialized = Buffer.from(transaction.serialize()).toString("base64");
    return json({ serialized });
  } catch (e) {
    console.log(e);
    return json({ error: "An error occurred" });
  }
}
export {
  POST
};
