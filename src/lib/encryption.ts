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
    // Convert hex-encoded key to Buffer
    const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');
    // Decode IV and tag from base64 to Buffer
    const ivBuffer = Buffer.from(iv, 'base64');
    const tagBuffer = Buffer.from(tag, 'base64');
    // Assume data is base64-encoded, so decode it
    const dataBuffer = Buffer.from(data, 'base64');

    const decipher = crypto.createDecipheriv(ecnryption_method, keyBuffer, ivBuffer);
    // Set the authentication tag
    decipher.setAuthTag(tagBuffer);

    // Decrypt the data
    let decrypted = decipher.update(dataBuffer, undefined, 'utf8'); // input encoding is not needed for Buffers
    decrypted += decipher.final('utf8');
    return decrypted;
};