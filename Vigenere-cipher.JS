// Vigenere Cipher Encryption

function vigenereEncrypt(plaintext, keyword) {
  keyIndex = 0;
  let result = '';
  let plaintText = plaintext.toUpperCase().replace(/[^A-Z]/g,'');
  keyword = keyword.toUpperCase();
  for (let i = 0; i < plaintText.length; i++) {
    // Convert letters to numbers
    let plainPos = plaintText.charCodeAt(i) - 65;
    // Get the corresponding letter from the keyword
    let keyPos = keyword.charCodeAt(keyIndex % keyword.length) - 65;

    // TODO: Calculate (plainPos + keyPos) % 26
    // TODO: Convert to character and add to result keyIndex++;

    // Creating the new position by adding plainPos and keyPos
    let newPosition = (plainPos + keyPos) % 26;

    // Converting back to character and adding to result
    result += String.fromCharCode(newPosition + 65);
    keyIndex++;
  }
  return result;
}

console.log(vigenereEncrypt("ATTACK", "LEMON"));




// Vigenere Cipher Decryption

function vigenereDecrypt(ciphertext, keyword) {
  keyIndex = 0;
  let result = '';
  let cipherText = ciphertext.toUpperCase().replace(/[^A-Z]/g,'');
  keyword = keyword.toUpperCase();
  for (let i = 0; i < cipherText.length; i++) {
    // Convert letters to numbers
    let cipherPos = cipherText.charCodeAt(i) - 65;
    // Get the corresponding letter from the keyword
    let keyPos = keyword.charCodeAt(keyIndex % keyword.length) - 65;
    // Calculate the plaintext position
    let plainPos = (cipherPos - keyPos + 26) % 26;
    // Convert back to character and add to result
    result += String.fromCharCode(plainPos + 65);
    keyIndex++;
  }
  return result;
}

console.log(vigenereDecrypt("LXFOPV", "LEMON"));