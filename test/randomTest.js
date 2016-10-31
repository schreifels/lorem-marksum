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

  describe('#randomElementType', () => {
    function callRepeatedlyAndVerify(previousElementTypes, callback) {
      for (let i = 0; i < 1000; i++) {
        callback(random.randomElementType(previousElementTypes));
      }
    }

    context('with no previousElementTypes', () => {
      it('returns one of the expected elementTypes', () => {
        callRepeatedlyAndVerify([], (elementType) => {
          assert.strictEqual(elementType, 'HEADER_1');
        });
      });
    });

    context('with previousElementType of HEADER_1', () => {
      it('returns one of the expected elementTypes', () => {
        callRepeatedlyAndVerify(['HEADER_1'], (elementType) => {
          assert.include(['HEADER_2', 'PARAGRAPH'], elementType);
        });
      });
    });

    context('with previousElementType of HEADER_2', () => {
      it('returns one of the expected elementTypes', () => {
        callRepeatedlyAndVerify(['HEADER_2'], (elementType) => {
          assert.include(['HEADER_3', 'PARAGRAPH'], elementType);
        });
      });
    });

    context('with previousElementType of HEADER_3', () => {
      it('returns one of the expected elementTypes', () => {
        callRepeatedlyAndVerify(['HEADER_3'], (elementType) => {
          assert.strictEqual(elementType, 'PARAGRAPH');
        });
      });
    });

    context('with previousElementType of PARAGRAPH', () => {
      context('with no header ancestors', () => {
        it('returns one of the expected elementTypes', () => {
          callRepeatedlyAndVerify(['PARAGRAPH'], (elementType) => {
            assert.include(['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST'], elementType);
          });
        });
      });

      context('with a header great-grandparent', () => {
        it('returns one of the expected elementTypes', () => {
          callRepeatedlyAndVerify(['HEADER_1', 'PARAGRAPH', 'PARAGRAPH'], (elementType) => {
            assert.include(['HEADER_2', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST'], elementType);
          });

          callRepeatedlyAndVerify(['HEADER_1', 'HEADER_2', 'PARAGRAPH', 'PARAGRAPH'], (elementType) => {
            assert.include(['HEADER_2', 'HEADER_3', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST'], elementType);
          });

          callRepeatedlyAndVerify(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', 'PARAGRAPH'], (elementType) => {
            assert.include(['HEADER_2', 'HEADER_3', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST'], elementType);
          });
        });
      });
    });

    ['ORDERED_LIST', 'UNORDERED_LIST'].forEach((previousElementType) => {
      context(`with previousElementType of ${previousElementType}`, () => {
        context('with no header ancestors', () => {
          it('returns one of the expected elementTypes', () => {
            callRepeatedlyAndVerify([previousElementType], (elementType) => {
              assert.include(['PARAGRAPH'], elementType);
            });
          });
        });

        context('with a header great-grandparent', () => {
          it('returns one of the expected elementTypes', () => {
            callRepeatedlyAndVerify(['HEADER_1', 'PARAGRAPH', previousElementType], (elementType) => {
              assert.include(['HEADER_2', 'PARAGRAPH'], elementType);
            });

            callRepeatedlyAndVerify(['HEADER_1', 'HEADER_2', 'PARAGRAPH', previousElementType], (elementType) => {
              assert.include(['HEADER_2', 'HEADER_3', 'PARAGRAPH'], elementType);
            });

            callRepeatedlyAndVerify(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', previousElementType], (elementType) => {
              assert.include(['HEADER_2', 'HEADER_3', 'PARAGRAPH'], elementType);
            });
          });
        });
      });
    });
  });
});
