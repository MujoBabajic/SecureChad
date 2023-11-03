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

//DARK MODE
function engageDarkMode() {
  document.body.classList.toggle("dark-mode");
}

//ENCRYPTING TEXT AND DISPLAYING IT
encodeButton.addEventListener("click", () => {
  if (encoderInput.value == "") {
    encoderOutput.innerText = "No text in the input";
  } else {
    if (encoderAlgorithmSelect.value == "caesar-algorithm") {
      encoderOutput.value = caesarCipherEncoder(
        encoderInput.value,
        caesarShiftInput.value
      );
    } else if (encoderAlgorithmSelect.value == "vigenere-algorithm") {
      encoderOutput.value = vigenereCipherEncoder(
        encoderInput.value,
        vigenereKeywordInput.value
      );
    } else if (encoderAlgorithmSelect.value == "rot13-algorithm") {
      encoderOutput.value = ROT13CipherEncoder(encoderInput.value);
    } else if (encoderAlgorithmSelect.value == "atbash-algorithm") {
      encoderOutput.value = atbashCipherEncoder(encoderInput.value);
    } else if (encoderAlgorithmSelect.value == "substitution-algorithm") {
      encoderOutput.value = substitutionCipherEncoder(
        encoderInput.value,
        substitutionInput.value
      );
    }
  }
});

//DECRYPTING TEXT AND DISPLAYING THE USED ALGORITHM
function findLastDoubleDash(str) {
  for (let i = str.length - 2; i >= 0; i--) {
    if (str[i] === "-" && str[i + 1] === "-") {
      return `${str[i - 2]}${str[i - 1]}`;
    }
  }
  return -1;
}

decodeButton.addEventListener("click", () => {
  if (decoderInput.value == "")
    decoderOutput.innerText = "No text in the input";
  else {
    decoderOutput.value = decoder(decoderInput.value);

    let algo = findLastDoubleDash(decoderInput.value);
    if (algo == "cc") decoderDetectorOutput.innerText = "Caesar Cipher";
    else if (algo == "vc") decoderDetectorOutput.innerText = "Vigenere Cipher";
    else if (algo == "rot13") decoderDetectorOutput.innerText = "ROT13 Cipher";
    else if (algo == "ac") decoderDetectorOutput.innerText = "Atbash Cipher";
    else if (algo == "sc")
      decoderDetectorOutput.innerText = "Substitution Cipher";
  }
});

//COPY TO CLIPBOARD BUTTON ACTIONS
function copyToClipboard(button) {
  let copyText;
  let tooltip;

  if (button == "encoder") {
    copyText = document.getElementById("encoder-text-output");
    tooltip = document.getElementById("myTooltip");
  } else if (button == "decoder") {
    copyText = document.getElementById("decoder-text-output");
    tooltip = document.getElementById("myTooltip2");
  }

  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);

  tooltip.innerHTML = "Copied";
}

function hoverOff() {
  let tooltip = document.getElementById("myTooltip");
  let tooltip2 = document.getElementById("myTooltip2");
  tooltip.innerHTML = "Copy to clipboard";
  tooltip2.innerHTML = "Copy to clipboard";
}
