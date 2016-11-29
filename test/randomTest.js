'use strict';

const random = require('../src/random');
const assert = require('chai').assert;

describe('random', () => {
  function assertReturnsAllValues(randomFunc, expectedValues, done, receivedValues = new Set()) {
    const randomValue = randomFunc();

    if (expectedValues.indexOf(randomValue) === -1) {
      throw new Error(`Received unexpected value "${randomValue}"`);
    }

    receivedValues.add(randomValue);

    if (expectedValues.length === receivedValues.size) {
      done();
    } else {
      setTimeout(assertReturnsAllValues.bind(null, randomFunc, expectedValues, done, receivedValues), 0);
    }
  }

  describe('#intInRange', () => {
    it('returns all possible values given enough iterations', (done) => {
      const expectedValues = [1, 2, 3];

      assertReturnsAllValues(() => {
        return random.intInRange(1, 3);
      }, expectedValues, done);
    });
  });
});
