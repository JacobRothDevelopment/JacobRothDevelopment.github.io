//#region CONST
const conf = {
  ids: {
    key: 'textKey',
    input: 'textInput',
    output: 'textOutput',
    btnNewKey: 'btnNewKey',
    btnEncrypt: 'btnEncrypt',
    btnReset: 'btnReset',
    isEncrypt: 'chkIsEncrypt',
    buttonName: 'textButtonTitle',
    titleName: 'textTitleTitle',
  },
  checkboxOptions: {
    false: {
      title: 'Encryption',
      label: 'Encrypt',
      function: runEncryption,
    },
    true: {
      title: 'Decryption',
      label: 'Decrypt',
      function: runDecryption,
    },
  },
};

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
  let key = document.getElementById(conf.ids.key);
  key.value = genKey(defaultKeyLength);
}

function runEncryption() {
  let message = document.getElementById(conf.ids.input).value;
  let key = document.getElementById(conf.ids.key).value;
  let cryptHexList = Encrypt(message, key);
  let cryptString = charHexArrayToString(cryptHexList);
  document.getElementById(conf.ids.output).innerHTML = cryptString;
}

function runDecryption() {
  let message = document.getElementById(conf.ids.input).value;
  let messageHex = stringToCharHexArray(message);
  let key = document.getElementById(conf.ids.key).value;
  let cryptHexList = Decrypt(messageHex, key);
  let cryptString = charHexArrayToString(cryptHexList);
  document.getElementById(conf.ids.output).innerHTML = cryptString;
}

function runCryptFunction() {
  let isDecrypt = document.getElementById(conf.ids.isEncrypt).checked;
  conf.checkboxOptions[isDecrypt].function();
}

function createEventListeners() {
  document.getElementById(conf.ids.input).addEventListener('input', (ev) => {
    runCryptFunction();
  });

  document.getElementById(conf.ids.btnNewKey).addEventListener('click', () => {
    setNewKey();
    runCryptFunction();
  });

  document.getElementById(conf.ids.btnEncrypt).addEventListener('click', () => {
    runCryptFunction();
  });

  document.getElementById(conf.ids.key).addEventListener('keydown', (ev) => {
    if (allowedKeyInputKeys.includes(ev.key)) {
      runCryptFunction();
    } else {
      ev.preventDefault();
      return false;
    }
  });

  document.getElementById(conf.ids.btnReset).addEventListener('click', () => {
    setNewKey();
    document.getElementById(conf.ids.input).value = '';
    document.getElementById(conf.ids.output).value = '';
  });

  document.getElementById(conf.ids.isEncrypt).addEventListener('input', () => {
    let isChecked = document.getElementById(conf.ids.isEncrypt).checked;
    document.getElementById(conf.ids.titleName).innerHTML =
      conf.checkboxOptions[isChecked].title;
    document.getElementById(conf.ids.buttonName).innerHTML =
      conf.checkboxOptions[isChecked].title;
    runCryptFunction();
  });
}

window.onload = function () {
  setNewKey();
  createEventListeners();
  document.getElementById(conf.ids.input).value = '';
  document.getElementById(conf.ids.output).innerHTML = '';
  document.getElementById(conf.ids.isEncrypt).checked = false;
};
