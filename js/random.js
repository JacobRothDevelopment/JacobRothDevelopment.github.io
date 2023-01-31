//#region CONST
const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lows = 'abcdefghijklmnopqrstuvwxyz';
const nums = '0123456789';
const spec = '!@#$%^&*()-_=+,./\\|`~;:\'"[]{}';

const lengthId = 'intLength';
const passwordId = 'textOutput';
const lengthLabelId = 'textLengthValue';
const optionsButton = 'btnShowMore';
const optionsDiv = 'divOptions';
const defaultLength = 28;

const checkboxCapitals = 'checkCaps';
const checkboxLowercase = 'checkLows';
const checkboxNumbers = 'checkNums';
const checkboxSpecials = 'checkSpec';

const hideOptionsClass = 'hidden';
const localSettings = 'optionsSettings';
//#endregion CONST

//#region LISTENERS
function createOptionsListeners() {
  document.getElementById(optionsButton).addEventListener('click', (ev) => {
    toggleOptionsHeight();
    updateButtonText();
  });
}

function createLengthListeners() {
  document.getElementById(lengthId).addEventListener('input', (ev) => {
    updateLengthLabel();
  });
}
//#endregion LISTENERS

//#region BUTTON CLICKS
function reset() {
  // reset length
  document.getElementById(lengthId).value = defaultLength;
  updateLengthLabel();

  // clear Output
  setOutput('');

  // check all options
  document.getElementById(checkboxCapitals).checked = true;
  document.getElementById(checkboxLowercase).checked = true;
  document.getElementById(checkboxNumbers).checked = true;
  document.getElementById(checkboxSpecials).checked = true;

  // remove local storage
  localStorage.removeItem(localSettings);
}

function copyToClipboard() {
  const pw = document.getElementById(passwordId).innerHTML;
  navigator.clipboard.writeText(pw);
}

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

function saveSettings() {
  let optionsSettings = {
    length: document.getElementById(lengthId).value,
    checkCaps: document.getElementById(checkboxCapitals).checked,
    checkLows: document.getElementById(checkboxLowercase).checked,
    checkNums: document.getElementById(checkboxNumbers).checked,
    checkSpec: document.getElementById(checkboxSpecials).checked,
  };
  localStorage.setItem(localSettings, JSON.stringify(optionsSettings));
  return true;
}
//#endregion BUTTON CLICKS

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
  document.getElementById(lengthLabelId).innerHTML = length;
}

function setOutput(string) {
  document.getElementById(passwordId).innerHTML = string;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function toggleOptionsHeight() {
  let currentHeight = document.getElementById(optionsDiv).clientHeight;
  let childClientHeight =
    document.getElementById(optionsDiv).children[0].clientHeight;
  let toHeight = currentHeight === 0 ? childClientHeight : 0;
  setElementHeight(optionsDiv, toHeight);
}

function updateButtonText() {
  document.getElementById(optionsButton).innerHTML =
    document.getElementById(optionsDiv).clientHeight === 0 ? '&or;' : '&and;';
}

function setElementHeight(id, pixels) {
  document.getElementById(id).style.height = `${pixels}px`;
}

function tryLoadSettings() {
  let optionsSettings = JSON.parse(localStorage.getItem(localSettings));
  if (optionsSettings === null) return false;

  document.getElementById(lengthId).value = optionsSettings.length;
  updateLengthLabel();

  document.getElementById(checkboxCapitals).checked = optionsSettings.checkCaps;
  document.getElementById(checkboxLowercase).checked =
    optionsSettings.checkLows;
  document.getElementById(checkboxNumbers).checked = optionsSettings.checkNums;
  document.getElementById(checkboxSpecials).checked = optionsSettings.checkSpec;

  return true;
}

window.onload = function () {
  updateLengthLabel();
  setOutput('');
  createOptionsListeners();
  createLengthListeners();
  tryLoadSettings();
};
