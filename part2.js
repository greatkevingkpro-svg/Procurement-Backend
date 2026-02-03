function caesarEncrypt(text, shift) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    // if() for Uppercase handling
    if (char >= 'A' && char <= 'Z') {
      // Convert letter to number
      let position = char.charCodeAt(0) - 65; 

      // Shift the letter
      let newPosition = (position + shift) % 26;
      
      // Convert number back to letter
      result += String.fromCharCode(newPosition + 65);
    } else if (char >= 'a' && char <= 'z') { 
      // else if() for Handling lowercase letters
        // TODO: Complete for lowercase letters
        // Hint: Use 97 instead of 65 

      let position = char.charCodeAt(0) - 97;
      let newPosition = (position + shift) % 26;
      result += String.fromCharCode(newPosition + 97);
    } else {
      // else for Non-alphabetic characters like: spaces, punctuation
      result += char;
    }
  } return result;
}
console.log(caesarEncrypt("Hello World", 3));

// try using shift right 5 from part 1.1
console.log(caesarEncrypt("MEET ME AN NOON", 5));

// Exercise2.2:WriteDecryption
function caesarDecrypt(text, shift) { 
  // TODO: Write decryption 
  //Hint: Same as encrypt but subtract shift


  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char >= 'A' && char <= 'Z') {
      let position = char.charCodeAt(0) - 65; 
      let newPosition = (position - shift) % 26; 
      result += String.fromCharCode(newPosition + 65);
    } else if (char >= 'a' && char <= 'z') { 
        // TODO: Complete for lowercase letters
        // Hint: Use 97 instead of 65 
      let position = char.charCodeAt(0) - 97;
      let newPosition = (position - shift) % 26;
      result += String.fromCharCode(newPosition + 97);
    } else {
      result += char;
    }
  } return result;
  } 
console.log(caesarDecrypt("Khoor Zruog", 3));

// try using shift left 7 from part 1.2
console.log(caesarDecrypt("OLSSV", 7));