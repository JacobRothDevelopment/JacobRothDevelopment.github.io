const isDebug = true;

const scoreChars = [...'-0123456789'].concat(['Backspace', 'Enter']);
const tableScores = document.getElementById('tableScores');
const tableScoresBody = tableScores.children[1];

const p1Name = document.getElementById('txtPlayer1Name');
const p2Name = document.getElementById('txtPlayer2Name');
const p1Score = document.getElementById('txtPlayer1Score');
const p2Score = document.getElementById('txtPlayer2Score');

const defaultLP = 8000;

var gameState = {
  player1: {
    name: 'Me',
    lp: defaultLP,
  },
  player2: {
    name: "The Sucker I'm Playing",
    lp: defaultLP,
  },
};

function debug(s) {
  if (isDebug === true) {
    console.log(s);
  }
}

/**
 * stolen from comment on this SO post: https://stackoverflow.com/a/175787
 * @param {string} s
 * @returns {boolean}
 */
function isNumber(s) {
  if (s === '') return false;
  return +s === +s;
}

/**
 * called by number inputs. Allows only certain inputs
 * @param {KeyboardEvent} e
 */
function filterNonNumbers(e) {
  if (!scoreChars.includes(e.key)) e.preventDefault();
  if (
    e.key !== 'Backspace' &&
    e.target.value.length > 1 &&
    !isNumber(e.target.value + e.key)
  )
    e.preventDefault();

  if (e.key === 'Enter') {
    console.log(e.target.value, isNumber(e.target.value));
    if (!isNumber(e.target.value)) {
      confirm('entry is not a number');
      e.preventDefault();
      return;
    }
    addRow();
  }
}

function disableAllInputs() {
  const tds = document.querySelectorAll('#tableScores td input');
  for (let i = 0; i < tds.length; i++) {
    var td = tds[i];
    td.disabled = true;
  }
}

function insertNewRow() {
  var tr = document.createElement('tr');

  var td1 = document.createElement('td');
  td1.colSpan = 2;
  var td2 = document.createElement('td');
  td2.colSpan = 2;

  var input1 = document.createElement('input');
  input1.type = 'number';
  input1.step = 1;
  input1.className = 'form-control';
  input1.setAttribute('data-player', 1);
  input1.addEventListener('keydown', (e) => keydown_damageInput(e));

  var input2 = document.createElement('input');
  input2.type = 'number';
  input2.step = 1;
  input2.className = 'form-control';
  input2.setAttribute('data-player', 2);
  input2.addEventListener('keydown', (e) => keydown_damageInput(e));

  td1.appendChild(input1);
  td2.appendChild(input2);

  tr.appendChild(td1);
  tr.appendChild(td2);

  tableScoresBody.appendChild(tr);
}

function addRow() {
  updateLP();
  showPlayer();
  disableAllInputs();
  insertNewRow();
}

/**
 * Calculate damages done to player
 * @param {int} n
 */
function getPlayerDamage(n) {
  const inputs = document.querySelectorAll(`input[data-player='${n}']`);
  var totalDamage = 0;
  for (let i = 0; i < inputs.length; i++) {
    const val = +inputs[i].value;
    totalDamage += val;
  }
  return totalDamage;
}

function updateLP() {
  gameState.player1.lp = Math.max(0, defaultLP + getPlayerDamage(1));
  gameState.player2.lp = Math.max(0, defaultLP + getPlayerDamage(2));
}

function showPlayer() {
  p1Name.innerText = gameState.player1.name;
  p2Name.innerText = gameState.player2.name;

  p1Score.innerText = gameState.player1.lp;
  p2Score.innerText = gameState.player2.lp;

  p1Score.className = `lp-${gameState.player1.lp}`;
  p2Score.className = `lp-${gameState.player2.lp}`;
}

//#region INPUT EVENTS

function click_reset() {
  const confirmed = confirm('Are you sure you want to reset?');
  if (!confirmed) return false;

  const trs = document.querySelectorAll('#tableScores tbody tr');
  for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    tr.remove();
  }

  insertNewRow();

  gameState.player1.lp = defaultLP;
  gameState.player2.lp = defaultLP;

  showPlayer();
}

function click_addRow() {
  // should only ever be addRow()
  addRow();
}

function keydown_damageInput(e) {
  filterNonNumbers(e);
}

//#endregion

function setUpScoresTable() {
  showPlayer();
  insertNewRow();
}

setUpScoresTable();
