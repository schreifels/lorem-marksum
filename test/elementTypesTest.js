'use strict';

const assert = require('chai').assert;
const elementTypes = require('../src/elementTypes');

describe('elementTypes', () => {
  describe('#forNextElement', () => {
    context('with no previousElementTypes', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(elementTypes.forNextElement([]),
                          ['HEADER_1']);
      });
    });

    context('with previousElementType of HEADER_1', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(elementTypes.forNextElement(['HEADER_1']),
                          ['HEADER_2', 'PARAGRAPH']);
      });
    });

    context('with previousElementType of HEADER_2', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(elementTypes.forNextElement(['HEADER_2']),
                          ['HEADER_3', 'PARAGRAPH']);
      });
    });

    context('with previousElementType of HEADER_3', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(elementTypes.forNextElement(['HEADER_3']),
                          ['PARAGRAPH']);
      });
    });

    context('with previousElementType of PARAGRAPH', () => {
      context('with no header ancestors', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(elementTypes.forNextElement(['PARAGRAPH']),
                            ['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
        });
      });

      context('with a header great-grandparent', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'PARAGRAPH', 'PARAGRAPH']),
                            ['HEADER_2', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
          assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'PARAGRAPH', 'PARAGRAPH']),
                            ['HEADER_2', 'HEADER_3', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
          assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', 'PARAGRAPH']),
                            ['HEADER_2', 'HEADER_3', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
        });
      });
    });

    ['ORDERED_LIST', 'UNORDERED_LIST'].forEach((previousElementType) => {
      context(`with previousElementType of ${previousElementType}`, () => {
        context('with no header ancestors', () => {
          it('returns the correct element types', () => {
            assert.deepEqual(elementTypes.forNextElement([previousElementType]),
                              ['PARAGRAPH']);
          });
        });

        context('with a header great-grandparent', () => {
          it('returns the correct element types', () => {
            assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'PARAGRAPH', previousElementType]),
                              ['HEADER_2', 'PARAGRAPH']);
            assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'PARAGRAPH', previousElementType]),
                              ['HEADER_2', 'HEADER_3', 'PARAGRAPH']);
            assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', previousElementType]),
                              ['HEADER_2', 'HEADER_3', 'PARAGRAPH']);
          });
        });
      });
    });
  });
});
