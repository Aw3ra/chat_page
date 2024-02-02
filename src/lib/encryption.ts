import crypto from "crypto";

const {
    ENCRYPTION_KEY = "",
} = process.env;

const ecnryption_method = "aes-256-gcm";

export const encrypt = (str: string) => {
    // create a random initialization vector
    const iv = crypto.randomBytes(12).toString("base64");
  
    // create a cipher object
    const cipher = crypto.createCipheriv(
        ecnryption_method,
        ENCRYPTION_KEY,
        iv
    );
  
    // update the cipher object with the plaintext to encrypt
    let data = cipher.update(str, "utf8", "base64");
  
    // finalize the encryption process 
    data += cipher.final('base64');
    
    // retrieve the authentication tag for the encryption
    const tag = cipher.getAuthTag();
    
    return { data, iv, tag };
}

export const decrypt = (encryptedData, ivString, tagBuffer) => {
    // Convert IV and tag from their respective formats to Buffers
    const iv = Buffer.from(ivString, 'base64');
    const tag = Buffer.from(tagBuffer.data);

    // Create a decipher
    const decipher = crypto.createDecipheriv(ecnryption_method, Buffer.from(ENCRYPTION_KEY, 'base64'), iv);
    decipher.setAuthTag(tag);

    // Perform the decryption
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
