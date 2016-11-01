'use strict';

const weightsByElementType = {
  'HEADER_1': 1,
  'HEADER_2': 1,
  'HEADER_3': 1,
  'PARAGRAPH': 10,
  'ORDERED_LIST': 1,
  'UNORDERED_LIST': 1
};

function headerTypesForNextElement(previousElementTypes) {
  for (let i = previousElementTypes.length - 1; i >= 0; i--) {
    switch (previousElementTypes[i]) {
      case 'HEADER_1':
        return ['HEADER_2'];
      case 'HEADER_2':
        return ['HEADER_2', 'HEADER_3'];
      case 'HEADER_3':
        return ['HEADER_2', 'HEADER_3'];
    }
  }

  return [];
}

function forNextElement(previousElementTypes, isLast) {
  const previousElementType = previousElementTypes[previousElementTypes.length - 1];
  let validElementTypes = [];

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
        validElementTypes.push(...headerTypesForNextElement(previousElementTypes));
        validElementTypes.push('PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST');
        break;
      case 'ORDERED_LIST':
      case 'UNORDERED_LIST':
        validElementTypes.push(...headerTypesForNextElement(previousElementTypes));
        validElementTypes.push('PARAGRAPH');
        break;
    }
  }

  if (isLast) {
    validElementTypes = validElementTypes.filter((elementType) => {
      return ['HEADER_2', 'HEADER_3'].indexOf(elementType) === -1;
    });
  }

  return validElementTypes;
}

function weightsFor(elementTypes) {
  return elementTypes.map((elementType) => {
    const weights = weightsByElementType[elementType];

    if (weights) {
      return weights;
    } else {
      throw new Error(`"${elementType}" is not a recognized element type`);
    }
  });
}

module.exports = {
  forNextElement,
  weightsFor
};
