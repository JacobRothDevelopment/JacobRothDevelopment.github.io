//#region CONST
const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lows = 'abcdefghijklmnopqrstuvwxyz';
const nums = '0123456789';
const spec = '!@#$%^&*()-_=+,./\\|`~;:\'"[]{}';
/* potential for basic specs

! % * _ + ~ - [ ] { } # =
! @ # $ % ^ & * ( ) - =

*/
// const extraSpecs = ''; // TODO
// const confusingChars = "0OlI" // TODO

const inputLength = document.getElementById('intLength');
const passwordOutput = document.getElementById('textOutput');
const lengthLabel = document.getElementById('textLengthValue');
const defaultLength = 32; // chars
const transitionTime = 100; // ms

const checkboxCapitals = document.getElementById('checkCaps');
const checkboxLowercase = document.getElementById('checkLows');
const checkboxNumbers = document.getElementById('checkNums');
const checkboxSpecials = document.getElementById('checkSpec');

const hideOptionsClass = 'hidden';
const localSettings = 'optionsSettings';
//#endregion CONST

//#region LISTENERS
inputLength.addEventListener('input', (ev) => {
  updateLengthLabel();
});

//#endregion LISTENERS

//#region BUTTON CLICKS
function reset() {
  // reset length
  inputLength.value = defaultLength;
  updateLengthLabel();

  // clear Output
  setOutput('');

  // check all options
  checkboxCapitals.checked = true;
  checkboxLowercase.checked = true;
  checkboxNumbers.checked = true;
  checkboxSpecials.checked = true;

  // remove local storage
  localStorage.removeItem(localSettings);
}

function copyToClipboard() {
  const pw = passwordOutput.innerText;
  navigator.clipboard.writeText(pw);

  flashOutline('outline-info');
}

function generatePassword() {
  const chosenChars = getAvailableCharacters();
  const length = inputLength.value;

  var password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, chosenChars.length);
    password += chosenChars[randomIndex];
  }

  setOutput(password);
  flashOutline('outline-primary');
}

//#endregion BUTTON CLICKS

/**
 * assigns `go` class and given border class, removing it after `transitionTime` ms
 * @param {string} borderClass
 */
function flashOutline(borderClass) {
  passwordOutput.classList.add('go', borderClass);
  window.setTimeout(() => {
    passwordOutput.classList.remove('go', borderClass);
  }, transitionTime);
}

function getAvailableCharacters() {
  let chars = '';
  chars += checkboxCapitals.checked ? caps : '';
  chars += checkboxLowercase.checked ? lows : '';
  chars += checkboxNumbers.checked ? nums : '';
  chars += checkboxSpecials.checked ? spec : '';
  return chars;
}

function updateLengthLabel() {
  const length = inputLength.value;
  lengthLabel.innerText = length;
}

function setOutput(string) {
  passwordOutput.innerText = string;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

window.onload = function () {
  updateLengthLabel();
  setOutput('');
  generatePassword();
};
