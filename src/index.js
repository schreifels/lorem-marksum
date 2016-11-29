'use strict';

const random = require('../src/random');
const elementTypes = require('../src/elementTypes');
const element = require('../src/element');

module.exports = (opts = {}) => {
  const minElements = opts.minElements || 10;
  const maxElements = opts.maxElements || (minElements * 2);

  if (!Number.isInteger(minElements)) {
    throw new Error(`Must provide an integer for minElements: ${minElements}`);
  }

  if (!Number.isInteger(maxElements)) {
    throw new Error(`Must provide an integer for maxElements: ${maxElements}`);
  }

  if (minElements > maxElements) {
    throw new Error(`minElements (${minElements}) must be less than or equal to maxElements (${maxElements})`);
  }

  const numElements = random.intInRange(minElements, maxElements);

  return elementTypes.generate(numElements).map((elementType) => {
    return element.generate(elementType);
  }).join("\n\n");
};
