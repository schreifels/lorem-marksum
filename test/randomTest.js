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
});
