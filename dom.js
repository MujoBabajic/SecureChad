//ENCODER REFERENCES
const encoderContainer = document.querySelector("#encoder-container");
const encoderInput = document.querySelector("#encoder-text-input");
const encoderAlgorithmSelect = document.querySelector("#algorithm-select");
const caesarShiftInput = document.querySelector("#caesar-shift-input");
const vigenereKeywordInput = document.querySelector("#vigenere-keyword-input");
const substitutionInput = document.querySelector("#substitution-input");
const encoderOutput = document.querySelector("#encoder-text-output");
const encodeButton = document.querySelector("#encode-button");

//DECODER REFERENCES
const decoderContainer = document.querySelector("#decoder-container");
const decoderInput = document.querySelector("#decoder-text-input");
const decoderDetectorOutput = document.querySelector(
  "#decoder-detector-output"
);
const decoderOutput = document.querySelector("#decoder-text-output");
const decodeButton = document.querySelector("#decode-button");

//SETTING TEXTAREAS TO BE READ-ONLY
encoderOutput.setAttribute("readonly", true);
decoderDetectorOutput.setAttribute("readonly", true);
decoderOutput.setAttribute("readonly", true);

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

//ENCODER/DECODER TABS ACTION
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

//COPY TO CLIPBOARD BUTTON ACTIONS
function copyToClipboard(button) {
  if (button == "encoder") {
    encoderOutput.select();
    encoderOutput.setSelectionRange(0, 99999);

    document.execCommand("copy");
  } else if (button == "decoder") {
    decoderOutput.select();
    decoderOutput.setSelectionRange(0, 99999);

    document.execCommand("copy");
  }

  alert("Text copied");
}

//DARK MODE
function engageDarkMode() {
  document.body.classList.toggle("dark-mode");
}

//ENCRYPTING TEXT AND DISPLAYING IT
encodeButton.addEventListener("click", () => {
  if (encoderAlgorithmSelect.value == "") {
    alert("No text in the input");
  } else {
    if (encoderAlgorithmSelect.value == "caesar-algorithm") {
      encoderOutput.value = caesarCipherAlgorithm(
        encoderInput.value,
        caesarShiftInput.value
      );
      
    } else if (encoderAlgorithmSelect.value == "vigenere-algorithm") {
      encoderOutput.value = vigenereCipherAlgorithm(
        encoderInput.value,
        vigenereKeywordInput.value
      );
    } else if (encoderAlgorithmSelect.value == "rot13-algorithm") {
      encoderOutput.value = ROT13Cipher(encoderInput.value);
    } else if (encoderAlgorithmSelect.value == "atbash-algorithm") {
      encoderOutput.value = atbashCipher(encoderInput.value);
    } else if (encoderAlgorithmSelect.value == "substitution-algorithm") {
      encoderOutput.value = simpleSubstitutionCipher(
        encoderInput.value,
        substitutionInput.value
      );
    }
  }
});

decodeButton.addEventListener('click', () => {
   decoderOutput.value = decoder(decoderInput.value);
  
  });
