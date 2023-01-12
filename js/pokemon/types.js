const types = [
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steele',
  'Fairy',
];

// reference: https://upload.wikimedia.org/wikipedia/commons/9/97/Pokemon_Type_Chart.svg
const matrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  [1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  [1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  [1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  [1, 0.5, 0.5, 2, 1, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  [1, 1, 1, 2, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  [1, 2, 1, 0.5, 2, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  [1, 1, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  [1, 0.5, 1, 2, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
  [1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
];

const cellClasses = {
  0: 'cell cell-black',
  0.5: 'cell cell-red',
  1: 'cell cell-white',
  2: 'cell cell-green',
  Normal: '',
  Fire: '',
  Water: '',
  Grass: '',
  Electric: '',
  Ice: '',
  Fighting: '',
  Poison: '',
  Ground: '',
  Flying: '',
  Psychic: '',
  Bug: '',
  Rock: '',
  Ghost: '',
  Dragon: '',
  Dark: '',
  Steele: '',
  Fairy: '',
};

const selectIds = ['selectAttackType', 'selectDefendType'];

function sanityCheck() {
  if (matrix.length != types.length)
    console.error(`matrix not of proper length`);

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    if (row.length != types.length)
      console.error(`row ${i} not of proper length`);
  }
}

function createTable() {
  let tempTable = document.createElement('table');
  let defendingRow = createRow(
    types,
    '',
    '',
    'cell p-1 write-vertical align-top'
  );
  tempTable.innerHTML += defendingRow.innerHTML;

  for (let i = 0; i < types.length; i++) {
    const attackingType = types[i];
    const row = createRow(
      matrix[i],
      attackingType,
      '',
      'p-1 text-center text-right'
    );
    tempTable.innerHTML += row.innerHTML;
  }

  // set table data
  /**
   * @type {HTMLTableElement}
   */
  let tableTypes = document.getElementById('tableTypes');
  tableTypes.innerHTML = tempTable.innerHTML;
}

/**
 * @param {*[]} row
 * @param {string} type
 * @param {string} rowClass
 * @param {string} cellClass
 */
function createRow(row, type, rowClass, cellClass) {
  let tr = document.createElement('tr');
  tr.classList += rowClass;
  let typeCell = createCell(type);
  typeCell.classList = 'cell p-1';
  typeCell.colSpan = 3;
  tr.innerHTML += typeCell.outerHTML;

  for (let i = 0; i < types.length; i++) {
    const advantage = row[i];

    let valueCell = createCell(
      advantage,
      `${cellClass} ${cellClasses[advantage]}`
    );
    tr.innerHTML += valueCell.outerHTML;
  }

  return tr;
}

/**
 * @param {int|string} value
 */
function createCell(value, cellClass) {
  let td = document.createElement('td');
  td.innerHTML = value;
  td.classList = cellClass;
  return td;
}

function fillTypeSelects() {
  let selects = document.querySelectorAll('select[data-fill-types="true"]');

  selects.forEach((select) => {
    setOptions(select, types);
  });
}

/**
 * @param {HTMLSelectElement} selectElement
 * @param {Map<int,string>} map
 */
function setOptions(selectElement, map) {
  // clear options
  selectElement.innerHTML = '';

  for (let i = 0; i < map.length; i++) {
    let option = document.createElement('option');
    option.innerHTML = map[i];
    option.value = i;
    selectElement.innerHTML += option.outerHTML;
  }
}

function updateOutput() {
  let attackIndex = document.getElementById('selectAttackType').value;
  let defendIndex = document.getElementById('selectDefendType').value;
  let advantage = matrix[attackIndex][defendIndex];
  // set output
  let output = document.getElementById('textOutput');
  output.innerHTML = advantage;
  output.value = advantage;
  output.classList = `form-control ${cellClasses[advantage]}`;
}

function createSelectListeners() {
  selectIds.forEach((selectId) => {
    document.getElementById(selectId).addEventListener('change', () => {
      console.log('here');
      updateOutput();
    });
  });
}

// #region ON LOAD
// when script loads, make sure the matrix makes sense
sanityCheck();

// on page load, create the info table
window.onload = function () {
  createTable();
  fillTypeSelects();
  createSelectListeners();
  updateOutput();
};
// #endregion ON LOAD
