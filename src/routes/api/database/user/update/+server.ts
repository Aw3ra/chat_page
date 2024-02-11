import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { Connection, Keypair } from "@solana/web3.js";
import { ShdwDrive } from "@shadow-drive/sdk";
import { RPC_URL, SHDW_PUBKEY, SOLGPT_PRIV_KEY} from "$env/static/private";
import { encrypt, decrypt } from "$lib/encryption";
import anchor from "@project-serum/anchor";
import bs58 from "bs58";
import type { userDetails } from "$lib/types"

// POST /api/user
export async function POST({ request }: RequestEvent) {
    const { pubkey, data } = await request.json()
    console.log(data)
    const connection = new Connection(RPC_URL)
    // SOLGPT private key is a string, convert it to a Keypair
    const keypair = Keypair.fromSecretKey(
        Uint8Array.from(
            bs58.decode(SOLGPT_PRIV_KEY)
        )
    );
    // The data is of type userDetails, we

    const wallet = new anchor.Wallet(keypair);
    const drive = await new ShdwDrive(connection, wallet).init();
    const acctPubKey = new anchor.web3.PublicKey(SHDW_PUBKEY);
    const encryption = encrypt(JSON.stringify(data));
    // Add the pubkey to the user type
    // Convert the user type to a buffer
    const newUserBuffer = Buffer.from(JSON.stringify(encryption, null, 2));
    const fileToUpload = {
        name: pubkey+".json", 
        file: newUserBuffer
    };
    // Upload the file to the drive
    const file = await drive.editFile(
        acctPubKey,
        `https://shdw-drive.genesysgo.net/${SHDW_PUBKEY}/${pubkey}.json`,
        fileToUpload
    );

    return json({
        status: 200,
        body: file,
    })
}

