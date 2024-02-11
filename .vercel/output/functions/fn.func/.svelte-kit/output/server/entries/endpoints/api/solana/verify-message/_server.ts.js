import { j as json } from "../../../../../chunks/index.js";
import jwt from "jsonwebtoken";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { J as JWT_SECRET } from "../../../../../chunks/private.js";
async function POST({ request }) {
  const {
    message = "",
    publicKey = "",
    signature = ""
  } = await request.json();
  const verifiedMessage = nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    bs58.decode(signature),
    bs58.decode(publicKey)
  );
  const verifiedToken = jwt.verify(message, JWT_SECRET);
  if (!verifiedToken) {
    throw new Error("Invalid token");
  }
  if (!verifiedMessage) {
    throw new Error("Invalid message");
  }
  return json({
    data: true
  });
}
export {
  POST
};
