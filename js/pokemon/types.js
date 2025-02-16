//#region CONST
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
  'Steel',
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
  '&#189;': 'cell cell-red',
  '': 'cell cell-white',
  2: 'cell cell-lime',
  Normal: 'type-normal',
  Fire: 'type-fire',
  Water: 'type-water',
  Grass: 'type-grass',
  Electric: 'type-electric',
  Ice: 'type-ice',
  Fighting: 'type-fighting',
  Poison: 'type-poison',
  Ground: 'type-ground',
  Flying: 'type-flying',
  Psychic: 'type-psychic',
  Bug: 'type-bug',
  Rock: 'type-rock',
  Ghost: 'type-ghost',
  Dragon: 'type-dragon',
  Dark: 'type-dark',
  Steel: 'type-steel',
  Fairy: 'type-fairy',
};

const outputConfig = {
  0: {
    text: 'Not Effective',
    class: 'advantage-0',
  },
  0.25: {
    text: '(Very) Not Very Effective',
    class: 'advantage-quarter',
  },
  0.5: {
    text: 'Not Very Effective',
    class: 'advantage-half',
  },
  1: {
    text: 'Effective',
    class: 'advantage-1',
  },
  2: {
    text: 'Super Effective',
    class: 'advantage-2',
  },
  4: {
    text: 'Super (Duper) Effective',
    class: 'advantage-4',
  },
};

const selectIds = [
  'selectAttackType',
  'selectDefendType1',
  'selectDefendType2',
];

const tableValues = {
  0: 0,
  0.5: '&#189;',
  1: '',
  2: 2,
};

const selectDatasetName = 'selectedType';
//#endregion CONST

function sanityCheck() {
  if (matrix.length != types.length)
    console.error(`matrix not of proper length`);

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    if (row.length != types.length)
      console.error(`row ${i} not of proper length`);
  }
}

function createTableValuesMatrix() {
  // clone 2d array like this; it's stupid
  let newMatrix = JSON.parse(JSON.stringify(matrix));

  for (let r = 0; r < matrix.length; r++) {
    const row = newMatrix[r];
    for (let e = 0; e < row.length; e++) {
      newMatrix[r][e] = tableValues[matrix[r][e]];
    }
  }

  return newMatrix;
}

function createTable() {
  let tempTable = document.createElement('table');
  let tbody = document.createElement('tbody');
  const valuesMatrix = createTableValuesMatrix();

  let defendingRow = createTypesRow();
  tbody.innerHTML += defendingRow.innerHTML;

  let teraRow = createTeraIconsRow();
  tbody.innerHTML += teraRow.innerHTML;

  for (let i = 0; i < types.length; i++) {
    const attackingType = types[i];
    const row = createRow(
      valuesMatrix[i],
      attackingType,
      '',
      'p-1 text-center text-right',
    );
    tbody.innerHTML += row.innerHTML;
  }
  // set table data
  /**
   * @type {HTMLTableElement}
   */
  let tableTypes = document.getElementById('tableTypes');
  tempTable.innerHTML = tbody.outerHTML;
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

  // type label
  var cellTypeClass = '';
  if (type.length > 0) cellTypeClass = cellClasses[type];
  let typeCell = createCell(type, `cell p-1 font-weight-bold ${cellTypeClass}`);
  typeCell.colSpan = 3;
  tr.innerHTML += typeCell.outerHTML;

  // tera icon
  const iconLink = getTeraIcon(type);
  const iconElement = `<img src="${iconLink}" />`;
  let valueCell = createCell(
    iconElement,
    `cell tera text-center ${cellClasses[type]}`,
  );
  tr.innerHTML += valueCell.outerHTML;

  for (let i = 0; i < types.length; i++) {
    const advantage = row[i];

    let valueCell = createCell(
      advantage,
      `${cellClass} ${cellClasses[advantage]}`,
    );
    tr.innerHTML += valueCell.outerHTML;
  }

  return tr;
}

function createTeraIconsRow() {
  let tr = document.createElement('tr');

  // type label
  let typeCell = createCell('Attacking', `cell p-1 font-weight-bold`);
  typeCell.colSpan = 3;
  tr.innerHTML += typeCell.outerHTML;

  // vertical tera cell
  let teraCell = createCell('', `cell`);
  tr.innerHTML += teraCell.outerHTML;

  for (let i = 0; i < types.length; i++) {
    const iconLink = getTeraIcon(types[i]);
    const element = `<img src="${iconLink}" />`;

    let valueCell = createCell(
      element,
      `cell tera text-center ${cellClasses[types[i]]}`,
    );
    tr.innerHTML += valueCell.outerHTML;
  }

  return tr;
}

function createTypesRow() {
  let tr = document.createElement('tr');

  // type label
  let typeCell = createCell('', `cell`);
  typeCell.colSpan = 3;
  tr.innerHTML += typeCell.outerHTML;

  // vertical tera cell
  let teraCell = createCell(
    'DeFending',
    `cell p-1 write-vertical align-top font-weight-bold`,
  );
  tr.innerHTML += teraCell.outerHTML;

  for (let i = 0; i < types.length; i++) {
    const advantage = types[i];

    let valueCell = createCell(
      advantage,
      `cell p-1 write-vertical align-top font-weight-bold ${cellClasses[advantage]}`,
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

  // if options-allow-null == 'true', add first element as empty choice
  if (
    'optionsAllowNull' in selectElement.dataset &&
    selectElement.dataset['optionsAllowNull'] == 'true'
  ) {
    let option = document.createElement('option');
    option.innerHTML = '';
    option.value = null;
    selectElement.innerHTML += option.outerHTML;
  }

  for (let i = 0; i < map.length; i++) {
    let option = document.createElement('option');
    option.innerHTML = map[i];
    option.value = i;
    // option.classList = cellClasses[map[i]];
    selectElement.innerHTML += option.outerHTML;
  }
}

function updateOutput() {
  let attackIndex = document.getElementById('selectAttackType').value;
  let defending1 = document.getElementById('selectDefendType1').value;
  let defending2 = document.getElementById('selectDefendType2').value;
  let advantage1 = matrix[attackIndex][defending1];
  let advantage2 = matrix[attackIndex][defending2];

  // if defending types are the same or one is null, consider it single typed
  let advantage = advantage1 * advantage2;
  if (defending1 === defending2 || defending2 === 'null') {
    advantage = advantage1;
  }

  // set output
  let output = document.getElementById('textOutput');
  output.innerHTML = outputConfig[advantage].text;
  output.value = outputConfig[advantage].text;
  output.classList = `form-control cursor-default ${outputConfig[advantage].class}`;
}

function createSelectListeners() {
  selectIds.forEach((selectId) => {
    document.getElementById(selectId).addEventListener('change', (ev) => {
      updateSelectStyle(ev.target);
      updateOutput();
    });
  });
}

/**
 * @param {HTMLSelectElement} el
 */
function updateSelectStyle(el) {
  let type = el.value in types ? types[el.value].toLowerCase() : 'null';
  el.dataset[selectDatasetName] = type;
}

function updateSelectsStyle() {
  for (let i = 0; i < selectIds.length; i++) {
    const selectId = selectIds[i];
    let select = document.getElementById(selectId);
    updateSelectStyle(select);
  }
}

/**
 * @param {string} type
 */
function getTeraIcon(type) {
  const typeLower = type.toLowerCase();
  return `https://www.serebii.net/pokedex-sv/teraicon/${typeLower}.png`;
}

function getTeraIconsList() {
  var links = [];
  for (let i = 0; i < types.length; i++) {
    const link = getTeraIcon(types[i]);
    const element = `<img src="${link}" />`;
    links.push(element);
  }
  return links;
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
  updateSelectsStyle();
};
// #endregion ON LOAD
