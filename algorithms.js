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
