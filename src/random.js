'use strict';

function fromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomElementType(previousElementTypes) {
  const validElementTypes = [];
  const previousElementType = previousElementTypes[previousElementTypes.length - 1];

  if (!previousElementType) {
    validElementTypes.push('HEADER_1');
  }

  return fromArray(validElementTypes);
}

module.exports = {
  fromArray,
  randomElementType
};
