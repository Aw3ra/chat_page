import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import { env } from "$env/dynamic/public";

const connection = new Connection(env.PUBLIC_RPC_URL);


export async function POST({ request }: RequestEvent) {
    const {
        amount = 0,
        from = "",
    } = await request.json();
    const total = amount*LAMPORTS_PER_SOL;
    // Round total up to the nearest whole number
    const lamports = Math.ceil(total);
    const latestBlockhash = await connection.getLatestBlockhash();
    const toPubkey = new PublicKey(process.env.TO_PUBLIC_ADDRESS);
    const instructions = [];
    const fromPubkey = new PublicKey(from);
    instructions.push(
        SystemProgram.transfer({
            fromPubkey: fromPubkey,
            toPubkey: toPubkey,
            lamports: lamports,
        })
    );
    const messageV0  = new TransactionMessage({
        instructions,
        payerKey: fromPubkey,
        recentBlockhash: latestBlockhash.blockhash,
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);

    const serialized = Buffer.from(transaction.serialize()).toString('base64');
    
    return json({serialized});
}