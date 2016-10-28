'use strict';

const assert = require('chai').assert;
const elementTypes = require('../src/elementTypes');

describe('elementTypes', () => {
  it('is a map containing only uppercase keys', () => {
    const elementTypeKeys = Object.keys(elementTypes);

    assert.isAbove(elementTypeKeys.length, 0);
    elementTypeKeys.forEach((type) => {
      assert.isString(type);
      assert.strictEqual(type, type.toUpperCase());
    });
  });

  it('contains a root element type', () => {
    assert.isDefined(elementTypes._ROOT);
  });

  it('relates each string to a corresponding symbol', () => {
    const elementTypeKeys = Object.keys(elementTypes);

    elementTypeKeys.forEach((type) => {
      assert.typeOf(elementTypes[type], 'symbol');
      assert.strictEqual(elementTypes[type].toString(), `Symbol(${type})`);
    });
  });
});
