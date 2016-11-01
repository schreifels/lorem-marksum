'use strict';

const random = require('../src/random');
const assert = require('chai').assert;

describe('random', () => {
  describe('#fromArray', () => {
    it('returns undefined when given an empty array', () => {
      assert.isUndefined(random.fromArray([]));
    });

    it('returns all possible values from the array given enough iterations', (done) => {
      let receivedValue1 = false;
      let receivedValue2 = false;
      let receivedValue3 = false;

      const array = [1, 2, 3];

      function generateRandomValue() {
        const randomValue = random.fromArray(array);

        switch (randomValue) {
          case 1:
            receivedValue1 = true;
            break;
          case 2:
            receivedValue2 = true;
            break;
          case 3:
            receivedValue3 = true;
            break;
          default:
            assert.fail();
        }

        if (receivedValue1 && receivedValue2 && receivedValue3) {
          done();
        } else {
          setTimeout(generateRandomValue, 0);
        }
      }

      generateRandomValue();
    });
  });

  describe('#validElementTypesForNextElement', () => {
    context('with no previousElementTypes', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(random.validElementTypesForNextElement([]),
                          ['HEADER_1']);
      });
    });

    context('with previousElementType of HEADER_1', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(random.validElementTypesForNextElement(['HEADER_1']),
                          ['HEADER_2', 'PARAGRAPH']);
      });
    });

    context('with previousElementType of HEADER_2', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(random.validElementTypesForNextElement(['HEADER_2']),
                          ['HEADER_3', 'PARAGRAPH']);
      });
    });

    context('with previousElementType of HEADER_3', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(random.validElementTypesForNextElement(['HEADER_3']),
                          ['PARAGRAPH']);
      });
    });

    context('with previousElementType of PARAGRAPH', () => {
      context('with no header ancestors', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(random.validElementTypesForNextElement(['PARAGRAPH']),
                            ['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
        });
      });

      context('with a header great-grandparent', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(random.validElementTypesForNextElement(['HEADER_1', 'PARAGRAPH', 'PARAGRAPH']),
                            ['HEADER_2', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
          assert.deepEqual(random.validElementTypesForNextElement(['HEADER_1', 'HEADER_2', 'PARAGRAPH', 'PARAGRAPH']),
                            ['HEADER_2', 'HEADER_3', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
          assert.deepEqual(random.validElementTypesForNextElement(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', 'PARAGRAPH']),
                            ['HEADER_2', 'HEADER_3', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
        });
      });
    });

    ['ORDERED_LIST', 'UNORDERED_LIST'].forEach((previousElementType) => {
      context(`with previousElementType of ${previousElementType}`, () => {
        context('with no header ancestors', () => {
          it('returns the correct element types', () => {
            assert.deepEqual(random.validElementTypesForNextElement([previousElementType]),
                              ['PARAGRAPH']);
          });
        });

        context('with a header great-grandparent', () => {
          it('returns the correct element types', () => {
            assert.deepEqual(random.validElementTypesForNextElement(['HEADER_1', 'PARAGRAPH', previousElementType]),
                              ['HEADER_2', 'PARAGRAPH']);
            assert.deepEqual(random.validElementTypesForNextElement(['HEADER_1', 'HEADER_2', 'PARAGRAPH', previousElementType]),
                              ['HEADER_2', 'HEADER_3', 'PARAGRAPH']);
            assert.deepEqual(random.validElementTypesForNextElement(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', previousElementType]),
                              ['HEADER_2', 'HEADER_3', 'PARAGRAPH']);
          });
        });
      });
    });
  });
});
