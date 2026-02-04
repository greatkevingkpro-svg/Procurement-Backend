// RSA Asymmetric Encryption Example in Node.js

// This code shows how to use RSA asymmetric encryption in Node.js using the built-in 'crypto' module. 

const crypto = require('crypto');

// this code Generates a new RSA key pair.
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  // Defines the strength of the key in bits
  modulusLength: 2048,
  // Specifies how the public key is formatted
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  // Specifies how the private key is formatted
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' } 
});

/*
Converts the input text into a buffer (binary data)
- Uses crypto.publicEncrypt with the public key to encrypt the buffer.
-Converts the encrypted binary data into a Base64 string so it can be printed or stored easily
*/
function encrypt(text, publicKey) {
  const buffer = Buffer.from(text, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);

  return encrypted.toString('base64'); 
}

function decrypt(encryptedText, privateKey) {
  const buffer = Buffer.from(encryptedText, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);

  return decrypted.toString('utf8'); 
} 

const message = "Room5 RSA Encryption Test";
console.log("Original:", message); 

const encrypted = encrypt(message, publicKey); 
console.log("Encrypted:", encrypted); 

const decrypted = decrypt(encrypted, privateKey); 
console.log("Decrypted:", decrypted);