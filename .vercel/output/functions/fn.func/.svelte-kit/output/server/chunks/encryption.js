import crypto from "crypto";
import { Buffer } from "buffer";
const {
  ENCRYPTION_KEY = ""
} = process.env;
const ecnryption_method = "aes-256-gcm";
const encrypt = (str) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    ecnryption_method,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );
  let data = cipher.update(str, "utf8", "base64");
  data += cipher.final("base64");
  const tag = cipher.getAuthTag();
  return { data, iv: iv.toString("base64"), tag: tag.toString("base64") };
};
const decrypt = (data, iv, tag) => {
  const buff = Buffer.from(data, "base64");
  const decipher = crypto.createDecipheriv(ecnryption_method, ENCRYPTION_KEY, iv);
  return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8");
};
export {
  decrypt as d,
  encrypt as e
};
