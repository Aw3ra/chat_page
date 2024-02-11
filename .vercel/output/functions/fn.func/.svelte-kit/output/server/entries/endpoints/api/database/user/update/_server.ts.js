import { j as json } from "../../../../../../chunks/index.js";
import { Connection, Keypair } from "@solana/web3.js";
import { ShdwDrive } from "@shadow-drive/sdk";
import { R as RPC_URL, S as SOLGPT_PRIV_KEY, a as SHDW_PUBKEY } from "../../../../../../chunks/private.js";
import anchor from "@project-serum/anchor";
import bs58 from "bs58";
async function POST({ request }) {
  const { pubkey, data } = await request.json();
  const connection = new Connection(RPC_URL);
  const keypair = Keypair.fromSecretKey(
    Uint8Array.from(
      bs58.decode(SOLGPT_PRIV_KEY)
    )
  );
  const wallet = new anchor.Wallet(keypair);
  const drive = await new ShdwDrive(connection, wallet).init();
  const acctPubKey = new anchor.web3.PublicKey(SHDW_PUBKEY);
  const newUserBuffer = Buffer.from(JSON.stringify(data, null, 2));
  const fileToUpload = {
    name: pubkey + ".json",
    file: newUserBuffer
  };
  const file = await drive.editFile(
    acctPubKey,
    `https://shdw-drive.genesysgo.net/${SHDW_PUBKEY}/${pubkey}.json`,
    fileToUpload
  );
  return json({
    status: 200,
    body: file
  });
}
export {
  POST
};
