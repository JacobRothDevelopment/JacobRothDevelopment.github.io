//#region CONST
const keyId = 'textKey';
const inputId = 'textInput';
const outputId = 'textOutput';
const btnNewKey = 'btnNewKey';
const btnEncrypt = 'btnEncrypt';
const btnReset = 'btnReset';

const defaultKeyLength = 10;

const doNotUpdateOnKeys = ['Control', 'Alt', 'OS', 'Shift'];
const allowedKeyInputKeys = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Backspace',
];
//#endregion CONST

function setNewKey() {
  /** @type {HTMLInputElement} */
  let key = document.getElementById(keyId);
  key.value = genKey(defaultKeyLength);
}

function runEncryption() {
  let message = document.getElementById(inputId).value;
  let key = document.getElementById(keyId).value;
  let cryptHexList = Encrypt(message, key);
  let cryptString = charHexArrayToString(cryptHexList);
  document.getElementById(outputId).value = cryptString;
}

function createEventListeners() {
  document.getElementById(inputId).addEventListener('input', (ev) => {
    runEncryption();
  });

  document.getElementById(btnNewKey).addEventListener('click', () => {
    setNewKey();
    runEncryption();
  });

  document.getElementById(btnEncrypt).addEventListener('click', () => {
    runEncryption();
  });

  document.getElementById(keyId).addEventListener('keydown', (ev) => {
    if (allowedKeyKeys.includes(ev.key)) {
      runEncryption();
    } else {
      ev.preventDefault();
      return false;
    }
  });

  document.getElementById(btnReset).addEventListener('click', () => {
    setNewKey();
    document.getElementById(inputId).value = '';
    document.getElementById(outputId).value = '';
  });
}

window.onload = function () {
  setNewKey();
  createEventListeners();
};
