import { j as json } from "../../../../../../chunks/index.js";
import { a as SHDW_PUBKEY } from "../../../../../../chunks/private.js";
import { d as decrypt } from "../../../../../../chunks/encryption.js";
process.env;
async function POST({ request }) {
  try {
    const { pubkey } = await request.json();
    const url = `https://shdw-drive.genesysgo.net/${SHDW_PUBKEY}/${pubkey}.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { data, iv, tag } = await response.json();
    const decrypted = decrypt(data, iv, tag);
    return json({
      status: 200,
      body: decrypted
    });
  } catch (error) {
    return json({
      status: 500,
      body: "User not found"
    });
  }
}
export {
  POST
};
