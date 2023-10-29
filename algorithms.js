function caesarCipherAlgorithm(text, shiftNum) {
  shiftNum = shiftNum % 26;
  let finalHash;

  let charactersArray = text.split("");

  for (let i = 0; i < charactersArray.length; i++) {
    let char = charactersArray[i];

    if (char.match(/[a-zA-Z]/)) {
      let isUpperCase = char === char.toUpperCase();

      let shiftedCharCode = char.charCodeAt(0) + shiftNum;
      if (
        (isUpperCase && shiftedCharCode > 90) ||
        (!isUpperCase && shiftedCharCode > 122)
      ) {
        shiftedCharCode -= 26;
      }

      charactersArray[i] = String.fromCharCode(shiftedCharCode);
    }
  }

  finalHash = charactersArray.join("") + `--cc--${shiftNum}`;
  return finalHash
}

function vigenereCipherAlgorithm(text, keyword) {
  keyword = keyword.replace(/[^A-Za-z]/g, "").toUpperCase();
  let finalHash;

  let encryptedText = "";
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (char.match(/[A-Za-z]/)) {
      let keyChar = keyword[keyIndex % keyword.length];
      let shift = keyChar.charCodeAt(0) - "A".charCodeAt(0);

      if (char === char.toUpperCase()) {
        char = String.fromCharCode(
          ((char.charCodeAt(0) - "A".charCodeAt(0) + shift) % 26) +
          "A".charCodeAt(0)
        );
      } else {
        char = String.fromCharCode(
          ((char.charCodeAt(0) - "a".charCodeAt(0) + shift) % 26) +
          "a".charCodeAt(0)
        );
      }

      keyIndex++;
    }

    encryptedText += char;
  }
  finalHash = encryptedText + `--vc--${keyword}`
  return finalHash;
}


function ROT13Cipher(text) {
  return caesarCipherAlgorithm(text, 13);
}

function atbashCipher(text) {
  let encryptedText = '';
  let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let finalHash;

  for (let i = 0; i < text.length; i++) {
    let char = text[i].toLowerCase();
    if (alphabet.includes(char)) {
      let index = alphabet.indexOf(char);
      let reversedIndex = alphabet.length - 1 - index;
      encryptedText += alphabet[reversedIndex];
    }
    else {
      encryptedText += char;
    }
  }

  finalHash = encryptedText + `--ac`

  return finalHash;
}

function simpleSubstitutionCipher(text, table) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let encryptedText = '';
  let finalHash;

  if (table.length < 26) {
    alert('your substitution alphabet needs to contain 26 letters')
    return 'try again'
  }
  else {

    for (let i = 0; i < text.length; i++) {
      let char = text[i].toLowerCase();
      if (alphabet.includes(char)) {
        let index = alphabet.indexOf(char);
        encryptedText += table[index];
      } else {
        encryptedText += char;
      }
    }
    finalHash = encryptedText + `--ssc--${table}`
    return finalHash;
  }
}

//
function ccDecoder(cipherText, shift) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const cipherArray = cipherText.toLowerCase().split('');
  const decryptedArray = [];

  for (let i = 0; i < cipherArray.length; i++) {
    const char = cipherArray[i];
    if (alphabet.includes(char)) {
      const index = (alphabet.indexOf(char) - shift + 26) % 26;
      const decryptedChar = alphabet[index];
      decryptedArray.push(cipherText[i] === cipherText[i].toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar);
    } else {
      decryptedArray.push(char);
    }
  }

  return decryptedArray.join('');
}

function vcDecoder(cipherText) {

}

function acDecoder(cipherText) {
  let decryptedText = '';
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let reverseAlphabet = 'zyxwvutsrqponmlkjihgfedcba';

  for (let i = 0; i < cipherText.length; i++) {
    let char = cipherText[i].toLowerCase();
    if (alphabet.includes(char)) {
      let index = alphabet.indexOf(char);
      let reversedChar = reverseAlphabet[index];
      decryptedText += cipherText[i] === cipherText[i].toUpperCase() ? reversedChar.toUpperCase() : reversedChar;
    } else {
      decryptedText += char;
    }
  }

  return decryptedText;
}

function sscDecoder(cipherText) {

}

function decoder(hash) {
  let hashArr = hash.split('--');
  let algorithmCode = hashArr[hashArr.length - 2]; // code that identifies the algoritm (ac, cc, ...)
  let algorithmArg = hashArr[hashArr.length - 1]; // argument that is used in an algorithm (shift number, a keyword, alphabet ...)
  let rawCipher = ''; // cipher that needs to be decoded

  let possibleAlgorithmCodes = ['cc', 'vc', 'ac', 'ssc']

  for (let i = 0; i < hashArr.length; i++) {
    if (!possibleAlgorithmCodes.includes(hashArr[i])) {
      rawCipher += `${hashArr[i]}--`;
    }
    else {
      break
    }
  }
  rawCipher = rawCipher.replace(/--$/, '')

  if (algorithmArg == 'ac') {
    algorithmCode = algorithmArg;
  }

  switch (algorithmCode) {
    case 'cc':
      return ccDecoder(rawCipher, algorithmArg);
      break;
    case 'vc':
      return vcDecoder();
      break;
    case 'ac':
      return acDecoder(rawCipher);
    case 'ssc':
      return sscDecoder();
      break;
    default:
      alert('something went wnrong, report this to the developers');
      break;
  }
}
