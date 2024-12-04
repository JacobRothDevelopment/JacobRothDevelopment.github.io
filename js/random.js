//#region CONST
const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lows = 'abcdefghijklmnopqrstuvwxyz';
const nums = '0123456789';
const spec = '!@#$%^&*()-_=+,./\\|`~;:\'"[]{}';
/* potential for basic specs

! % * _ + ~ - [ ] { } # =
! @ # $ % ^ & * ( ) - =

*/
// const confusingChars = "0OlI" // TODO

const inputFormat = document.getElementById('textFormat');
const inputPreset = document.getElementById('selectPreset');
const inputLength = document.getElementById('intLength');
const passwordOutput = document.getElementById('textOutput');
const lengthLabel = document.getElementById('textLengthValue');
const defaultLength = 32; // chars
// const transitionTime = 2000; // ms
const transitionTime = 160; // ms

const checkboxCapitals = document.getElementById('checkCaps');
const checkboxLowercase = document.getElementById('checkLows');
const checkboxNumbers = document.getElementById('checkNums');
const checkboxSpecials = document.getElementById('checkSpec');

const hideOptionsClass = 'hidden';
const localSettings = 'optionsSettings';

const presets = {
  0: {
    name: 'Default',
    format: '',
    length: 36,
    capitals: true,
    lowers: true,
    numbers: true,
    specials: true,
  },
  1: {
    name: 'Sharable',
    format: 'xxx-xxx-xxx-xxx',
    length: 15,
    capitals: false,
    lowers: true,
    numbers: true,
    specials: false,
  },
};
//#endregion CONST

//#region LISTENERS

inputLength.addEventListener('input', updateLengthLabel);
inputFormat.addEventListener('input', updateLengthDisabled);
inputPreset.addEventListener('input', updateOptionsForPreset);

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

  flashOutline('outline-secondary');
}

function generatePassword() {
  const chosenChars = getAvailableCharacters();
  const length = inputLength.value;

  var password = '';

  for (let i = 0; i < length; i++) {
    // skip values where input format isn't 'x'
    // this maintains the desired format characters
    if (inputFormat.value && inputFormat.value[i] !== 'x') {
      password += inputFormat.value[i];
      continue;
    }

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
  passwordOutput.classList.add(borderClass, 'go');

  //remove wider outline
  window.setTimeout(() => {
    passwordOutput.classList.remove('go');
  }, transitionTime);

  //remove outline color
  window.setTimeout(() => {
    passwordOutput.classList.remove(borderClass, 'go');
  }, transitionTime * 2);
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

/**
 * Set Length Parameter
 * @param {int} num
 */
function setLength(num) {
  inputLength.value = num;
  updateLengthLabel();
}

function setOutput(string) {
  passwordOutput.innerText = string;
}

function updateLengthDisabled() {
  if (inputFormat.value.length > 0) {
    inputLength.disabled = true;
    setLength(inputFormat.value.length);
  } else {
    inputLength.disabled = false;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function populatePresets() {
  const keys = Object.keys(presets);
  console.log(keys);

  for (let i = 0; i < keys.length; i++) {
    const preset = presets[i];
    console.log(preset);
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = preset.name;
    console.log(option);

    inputPreset.appendChild(option);
  }
}

function updateOptionsForPreset() {
  const chosenPreset = inputPreset.value;
  const preset = presets[chosenPreset];

  inputLength.value = preset.length;
  inputFormat.value = preset.format;
  updateLengthDisabled();
  updateLengthLabel();
  checkboxCapitals.checked = preset.capitals;
  checkboxLowercase.checked = preset.lowers;
  checkboxNumbers.checked = preset.numbers;
  checkboxSpecials.checked = preset.specials;

  generatePassword();
}

window.onload = function () {
  updateLengthLabel();
  setOutput('');
  generatePassword();
  populatePresets();
  updateOptionsForPreset();
};
