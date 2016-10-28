'use strict';

const assert = require('chai').assert;
const elementTypes = require('../src/elementTypes');

describe('elementTypes', () => {
  it('is an array of uppercase strings', () => {
    assert.isArray(elementTypes);
    assert.isAbove(elementTypes.length, 0);

    elementTypes.forEach((type) => {
      assert.isString(type);
      assert.strictEqual(type, type.toUpperCase());
    });
  });
});
