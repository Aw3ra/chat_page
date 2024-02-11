import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { Connection, Keypair } from "@solana/web3.js";
import { ShdwDrive } from "@shadow-drive/sdk";
import { RPC_URL, SHDW_PUBKEY, SOLGPT_PRIV_KEY} from "$env/static/private";
import { wl } from "./wlList";
import { encrypt } from "$lib/encryption";
import anchor from "@project-serum/anchor";
import bs58 from "bs58";
import type { userDetails } from "$lib/types"

// POST /api/user
export async function POST({ request }: RequestEvent) {
    const { pubkey } = await request.json()
    const connection = new Connection(RPC_URL)
    const keypair = Keypair.fromSecretKey(
        Uint8Array.from(
            bs58.decode(SOLGPT_PRIV_KEY)
        )
    );
    try{
        const wallet = new anchor.Wallet(keypair);
        const drive = await new ShdwDrive(connection, wallet).init();
        const acctPubKey = new anchor.web3.PublicKey(SHDW_PUBKEY);
        let totalCredits = 10000
        if(wl.includes(pubkey)) totalCredits += 1000000
        const newUser:userDetails = {
            conversations: [],
            tier: "free",
            paidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
            credits: totalCredits,
        }
        const encryption = encrypt(JSON.stringify(newUser));
        const newUserBuffer = Buffer.from(JSON.stringify(encryption, null, 2));
        const fileToUpload = {
            name: pubkey+".json", 
            file: newUserBuffer
        };
        const file = await drive.uploadFile(
            acctPubKey,
            fileToUpload
        );

        return json({
            status: 200,
            body: newUser,
        })
    }
    catch (error) {
        console.log(error)
        return json({
            status: 500,
            body: "User not found",
        })
    }
}

