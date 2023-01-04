const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lows = 'abcdefghijklmnopqrstuvwxyz';
const nums = '1234567890';
const spec = '!@#$%^&*()-_=+,./\\|`~;:\'"[]{}';

const lengthId = 'intLength';
const outputId = 'textOutput';
const lengthValueId = 'intLengthValue';
const defaultLength = 28;

function generatePassword() {
  // TODO in the future, allow users to check what boxes to use
  const chosenChars = caps + lows + nums + spec;
  const length = document.getElementById(lengthId).value;

  var password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, chosenChars.length);
    password += chosenChars[randomIndex];
  }

  setOutput(password);
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
  document.getElementById(outputId).value = string;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function copyToClipboard() {
  const pw = document.getElementById(outputId).value;
  navigator.clipboard.writeText(pw);
}

window.onload = function () {
  updateLengthLabel();
  setOutput('');
};
