'use strict';

const assert = require('chai').assert;
const elementTypes = require('../src/elementTypes');
const validChildrenByElementType = require('../src/validChildrenByElementType');

describe('validChildrenByElementType', () => {
  let types;
  let allTypesAsSymbols;

  beforeEach(() => {
    types = Object.getOwnPropertySymbols(validChildrenByElementType);
    allTypesAsSymbols = Object.keys(elementTypes).map((type) => elementTypes[type]);
  });

  it('has a key for every element type', () => {
    assert.deepEqual(allTypesAsSymbols, types);
    assert.strictEqual(Object.keys(validChildrenByElementType).length, 0);
  });

  it('relates each element type to a set of element types', () => {
    types.forEach((type) => {
      assert.typeOf(validChildrenByElementType[type], 'set');

      validChildrenByElementType[type].forEach((childType) => {
        assert.include(allTypesAsSymbols, childType);
      })
    });
  });
});
