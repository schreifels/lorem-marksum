'use strict';

const random = require('../src/random');
const elementTypes = require('../src/elementTypes');
const element = require('../src/element');

module.exports = (opts = {}) => {
  if (typeof opts.minElements !== 'undefined' && !Number.isInteger(opts.minElements)) {
    throw new Error(`Must provide an integer for minElements: ${opts.minElements}`);
  }

  if (typeof opts.maxElements !== 'undefined' && !Number.isInteger(opts.maxElements)) {
    throw new Error(`Must provide an integer for maxElements: ${opts.maxElements}`);
  }

  const minElements = opts.minElements || 10;
  const maxElements = opts.maxElements || (minElements * 2);

  if (minElements > maxElements) {
    throw new Error(`minElements (${minElements}) must be less than or equal to maxElements (${maxElements})`);
  }

  const numElements = random.intInRange(minElements, maxElements);

  return elementTypes.generate(numElements).map((elementType) => {
    return element.generate(elementType);
  }).join("\n\n");
};
