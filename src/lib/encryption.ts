import crypto from "crypto";
import { Buffer } from "buffer";

const {
    ENCRYPTION_KEY = "",
} = process.env;

const ecnryption_method = "aes-256-gcm";

export const encrypt = (str: string) => {
    // create a random initialization vector
    const iv = crypto.randomBytes(12);
  
    // create a cipher object
    const cipher = crypto.createCipheriv(
        ecnryption_method,
        Buffer.from(ENCRYPTION_KEY, 'hex'),
        iv
    );
  
    // update the cipher object with the plaintext to encrypt
    let data = cipher.update(str, "utf8", "base64");
  
    // finalize the encryption process 
    data += cipher.final('base64');
    
    // retrieve the authentication tag for the encryption
    const tag = cipher.getAuthTag();
    
    return { data, iv: iv.toString('base64'), tag: tag.toString('base64') };
}

export const decrypt = (data: string, iv: string, tag: string) => {
    const buff = Buffer.from(data, 'base64');
    const decipher = crypto.createDecipheriv(ecnryption_method, ENCRYPTION_KEY, iv)

    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
}