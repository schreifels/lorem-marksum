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

  it('defines a set of valid children for each element type', () => {
    const elementTypeKeys = Object.keys(elementTypes);

    elementTypeKeys.forEach((type) => {
      elementTypes[type].forEach((childType) => {
        assert.isDefined(elementTypes[childType]);
      });
    });
  });
});
