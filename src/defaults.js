'use strict';

module.exports = {
  minElements: {
    get: () => { return 10; },
    describe: 10
  },
  maxElements: {
    get: (minElements) => { return minElements * 2; },
    describe: '2x minElements'
  }
};
