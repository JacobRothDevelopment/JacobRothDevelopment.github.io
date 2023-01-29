//#region CONST
const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lows = 'abcdefghijklmnopqrstuvwxyz';
const nums = '0123456789';
const spec = '!@#$%^&*()-_=+,./\\|`~;:\'"[]{}';

const lengthId = 'intLength';
const outputId = 'textOutput';
const lengthValueId = 'intLengthValue';
const optionsButton = 'btnShowMore';
const optionsDiv = 'divOptions';
const defaultLength = 28;

const checkboxCapitals = 'checkCaps';
const checkboxLowercase = 'checkLows';
const checkboxNumbers = 'checkNums';
const checkboxSpecials = 'checkSpec';

const hideOptionsClass = 'hidden';
//#endregion CONST

function generatePassword() {
  const chosenChars = getAvailableCharacters();
  const length = document.getElementById(lengthId).value;

  var password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, chosenChars.length);
    password += chosenChars[randomIndex];
  }

  setOutput(password);
}

function getAvailableCharacters() {
  let chars = '';
  chars += document.getElementById(checkboxCapitals).checked ? caps : '';
  chars += document.getElementById(checkboxLowercase).checked ? lows : '';
  chars += document.getElementById(checkboxNumbers).checked ? nums : '';
  chars += document.getElementById(checkboxSpecials).checked ? spec : '';
  return chars;
}

function updateLengthLabel() {
  const length = document.getElementById(lengthId).value;
  document.getElementById(lengthValueId).innerHTML = length;
}

function clearOutput() {
  document.getElementById(lengthId).value = defaultLength;
  updateLengthLabel();
  setOutput('');
}

function setOutput(string) {
  document.getElementById(outputId).innerHTML = string;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function copyToClipboard() {
  const pw = document.getElementById(outputId).innerHTML;
  navigator.clipboard.writeText(pw);
}

function createOptionsEvents() {
  document.getElementById(optionsButton).addEventListener('click', (ev) => {
    document.getElementById(optionsDiv).classList.toggle(hideOptionsClass);
    document.getElementById(optionsButton).innerHTML = document
      .getElementById(optionsDiv)
      .classList.contains(hideOptionsClass)
      ? '&and;'
      : '&or;';
  });
}

window.onload = function () {
  updateLengthLabel();
  setOutput('');
  createOptionsEvents();
};
