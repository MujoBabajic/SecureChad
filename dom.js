//ENCODER REFERENCES
const encoderInput = document.querySelector("#encoder-text-input");
const encoderAlgorithmSelect = document.querySelector("#algorithm-select");
const caesarShiftInput = document.querySelector("#caesar-shift-input");
const vigenereKeywordInput = document.querySelector("#vigenere-keyword-input");
const encoderOutput = document.querySelector("#encoder-text-output");
const encodeButton = document.querySelector("#encode-button");

//DECODER REFERENCES
const decoderInput = document.querySelector("#decoder-text-input");
const decoderDetectorOutput = document.querySelector(
  "#decoder-detector-output"
);
const decoderOutput = document.querySelector("#decoder-text-output");
const decodeButton = document.querySelector("#decode-button");

//ALGORITHM SELECT DYNAMIC INPUTS
encoderAlgorithmSelect.addEventListener("change", () => {
  if (encoderAlgorithmSelect.value == "caesar-algorithm") {
    document.querySelector("#vigenere-config").style.display = "none";
    document.querySelector("#substitution-config").style.display = "none";
    document.querySelector("#caesar-config").style.display = "block";
  } else if (encoderAlgorithmSelect.value == "vigenere-algorithm") {
    document.querySelector("#substitution-config").style.display = "none";
    document.querySelector("#caesar-config").style.display = "none";
    document.querySelector("#vigenere-config").style.display = "block";
  } else if (encoderAlgorithmSelect.value == "substitution-algorithm") {
    document.querySelector("#vigenere-config").style.display = "none";
    document.querySelector("#caesar-config").style.display = "none";
    document.querySelector("#substitution-config").style.display = "block";
  } else {
    document.querySelector("#vigenere-config").style.display = "none";
    document.querySelector("#caesar-config").style.display = "none";
    document.querySelector("#substitution-config").style.display = "none";
  }
});
