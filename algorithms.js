function caesarCipherAlgorithm(text, shiftNum) {
  shiftNum = shiftNum % 26;

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

  return charactersArray.join("");
}

function vigenereCipherAlgorithm(text, keyword) {
  keyword = keyword.replace(/[^A-Za-z]/g, "").toUpperCase();

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

  return encryptedText;
}
