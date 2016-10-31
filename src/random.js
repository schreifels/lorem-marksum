'use strict';

function fromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomElementType(previousElementTypes) {
  const validElementTypes = [];
  const previousElementType = previousElementTypes[previousElementTypes.length - 1];

  if (!previousElementType) {
    validElementTypes.push('HEADER_1');
  } else {
    switch (previousElementType) {
      case 'HEADER_1':
        validElementTypes.push('HEADER_2', 'PARAGRAPH')
        break;
      case 'HEADER_2':
        validElementTypes.push('HEADER_3', 'PARAGRAPH')
        break;
      case 'HEADER_3':
        validElementTypes.push('PARAGRAPH')
        break;
      case 'PARAGRAPH':
        for (let i = previousElementTypes.length - 1; i >= 0; i--) {
          if (previousElementTypes[i] === 'HEADER_1') {
            validElementTypes.push('HEADER_2');
            break;
          } else if (previousElementTypes[i] === 'HEADER_2') {
            validElementTypes.push('HEADER_2', 'HEADER_3');
            break
          } else if (previousElementTypes[i] === 'HEADER_3') {
            validElementTypes.push('HEADER_2', 'HEADER_3');
            break;
          }

          validElementTypes.push('PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST');
        }
        break;
    }
  }

  return fromArray(validElementTypes);
}

module.exports = {
  fromArray,
  randomElementType
};
