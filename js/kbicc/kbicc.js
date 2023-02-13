/* from https://github.com/JacobRothDevelopment/KBicc/blob/master/js/main.js */

const _numLoops = 48; // number of times encrypted
const _verbose = 0; // 0 is no print out; 1 is important print outs; 2 is all print outs
const _hexOut = true; // if true, print out hex array; otherwise, print chars
const _numBytes = 4; // don't hate me, it's actually the number of bytes, but rather the number of hex digits accounted for each char
const _numBits = _numBytes * 4;
const _numPartBytes = 2; // see above
const _numPartBits = _numPartBytes * 4;
const _keyChars = '0123456789';

function bitwiseXor(b1, b2) {
  var n1 = parseInt(b1.substring(0, _numPartBits), 2);
  var n2 = parseInt(b2.substring(0, _numPartBits), 2);
  var xor = n1 ^ n2;
  return xor.toString(2).padStart(_numPartBits, 0);
}

function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(_numPartBits, '0');
}

function absoluteMod(value, mod) {
  var a = value % mod;
  return (a + mod) % mod;
}

function shuffle(a) {
  if (a.length < 2) return a;
  var a1 = a.slice(0, -1);
  var a2 = a.slice(-1);
  return a2.concat(a1);
}

function unShuffle(a) {
  if (a.length < 2) return a;
  var a1 = a.slice(0, 1);
  var a2 = a.slice(1);
  return a2.concat(a1);
}

function charHexArrayToString(a) {
  var properSizeHexCharArray = [];
  var numPartsInWhole = _numBytes / _numPartBytes;
  for (let i = 0; i < a.length; i += numPartsInWhole) {
    var fullCharHex = '';
    for (let j = i; j < i + numPartsInWhole; j++) {
      fullCharHex += a[j];
    }
    properSizeHexCharArray.push(fullCharHex);
  }

  var string = '';
  for (let i = 0; i < properSizeHexCharArray.length; i++) {
    string += String.fromCharCode('0x' + properSizeHexCharArray[i]);
  }
  return string;
}

function stringToCharHexArray(s) {
  var hexArray = []; // each element is _numPartBytes long
  for (let i = 0; i < s.length; i++) {
    var el = s[i];
    var charCode = el.charCodeAt();
    var stringCode = charCode.toString(16);
    var paddedStringCode = stringCode.padStart(_numBytes, '0');

    // split full hex into equal sized parts of length _numPartBytes
    for (let i = 0; i < _numBytes / _numPartBytes; i++) {
      var bytePart = paddedStringCode.substring(
        i * _numPartBytes,
        (i + 1) * _numPartBytes
      );
      hexArray.push(bytePart);
    }
  }
  return hexArray;
}

function randomBits(l = _numPartBits) {
  var ret = '';
  for (let i = 0; i < l; i++) {
    if (Math.random() > 0.5) {
      ret += '0';
    } else {
      ret += '1';
    }
  }
  return ret;
}

function ConsoleOut(label, array) {
  if (_hexOut) {
    console.log(label.padEnd(10, ' ') + ':', array);
  } else {
    console.log(label.padEnd(10, ' ') + ':', charHexArrayToString(array));
  }
}

function iterateKeyChar(char, i) {
  var index = _keyChars.indexOf(char);
  return _keyChars[absoluteMod(index + i, _keyChars.length)];
}

function iterateKeyChars(key, n) {
  var newKey = '';
  for (let i = 0; i < key.length; i++) {
    newKey += iterateKeyChar(key[i], n);
  }
  return newKey;
}

function genKey(length) {
  var key = '';
  for (let i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * _keyChars.length);
    var randomKeyChar = _keyChars[randomIndex];
    key += randomKeyChar;
  }
  return key;
}

const Ops = {
  0: (inBins) => {
    return inBins;
  },
  1: (inBins) => {
    return bitwiseXor(inBins, '00000001');
  },
  2: (inBins) => {
    return bitwiseXor(inBins, '00000010');
  },
  3: (inBins) => {
    return bitwiseXor(inBins, '00000100');
  },
  4: (inBins) => {
    return bitwiseXor(inBins, '00001000');
  },
  5: (inBins) => {
    return bitwiseXor(inBins, '00010000');
  },
  6: (inBins) => {
    return bitwiseXor(inBins, '00100000');
  },
  7: (inBins) => {
    return bitwiseXor(inBins, '01000000');
  },
  8: (inBins) => {
    return bitwiseXor(inBins, '10000000');
  },
  9: (inBins) => {
    return bitwiseXor(inBins, '11111111');
  },
};

/**
input = array of hex value strings (each element should be 8 bits long); 
rawKey = the key as given by the 
*/
function Encrypt(input, rawKey) {
  var hexArrayOutput = [];

  for (let j = 0; j < _numLoops; j++) {
    hexArrayOutput = [];

    var shuffleVar = parseInt(randomBits(), 2);
    var shuffleHex = shuffleVar.toString(16).padStart(_numPartBytes, '0');
    var key = iterateKeyChars(rawKey, shuffleVar);

    for (let i = 0; i < input.length; i++) {
      var keyChar = key[(i + j) % key.length];
      var newKey = iterateKeyChar(keyChar, i + j);
      var op = Ops[newKey];
      var charAsciiHex = input[i];
      var charAsciiBin = hex2bin(charAsciiHex);

      var outBins = op(charAsciiBin);

      var outHex = parseInt(outBins, 2)
        .toString(16)
        .padStart(_numPartBytes, '0');
      hexArrayOutput.push(outHex);
      // for (let index = 0; index < outBins.length; index++) {
      //   var hexChar = outBins[index];
      // }
    }
    hexArrayOutput.push(shuffleHex);
    input = shuffle(hexArrayOutput);

    if (_verbose == 2) {
      ConsoleOut('encrypt' + j, hexArrayOutput);
    }
  }

  return hexArrayOutput;
}

/**
input = array of hex value strings (each element should be 8 bits long); 
rawKey = the key as given by the 
*/
function Decrypt(input, rawKey) {
  var hexArrayOutput = [];

  for (let j = _numLoops - 1; j >= 0; j--) {
    hexArrayOutput = [];

    var shuffleHexOut = input.pop();
    var shuffleVar = parseInt(shuffleHexOut, 16);
    var key = iterateKeyChars(rawKey, shuffleVar);

    for (let i = 0; i < input.length; i++) {
      var keyChar = key[(i + j + key.length) % key.length];
      var newKey = iterateKeyChar(keyChar, i + j);
      var op = Ops[newKey];
      var charAsciiHex = input[i];
      var charAsciiBin = hex2bin(charAsciiHex);

      var outBins = op(charAsciiBin);

      var outHex = parseInt(outBins, 2)
        .toString(16)
        .padStart(_numPartBytes, '0');
      hexArrayOutput.push(outHex);
      // for (let index = 0; index < outBins.length; index += 2) {
      //   var hexChar = outBins[index];
      // }
    }
    input = unShuffle(hexArrayOutput);

    if (_verbose == 2) {
      ConsoleOut('decrypt' + j, hexArrayOutput);
    }
  }

  return hexArrayOutput;
}
