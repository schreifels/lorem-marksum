'use strict';

const loremMarksum = require('../src/index');
const assert = require('chai').assert;

describe('index', () => {
  it('allows no options', () => {
    assert.isString(loremMarksum());
  });

  it('allows only minElements', () => {
    assert.isString(loremMarksum({ minElements: 5 }));
  });

  it('allows only maxElements', () => {
    assert.isString(loremMarksum({ maxElements: 15 }));
  });

  it('allows both minElements and maxElements', () => {
    assert.isString(loremMarksum({ minElements: 5, maxElements: 8 }));
  });

  it('allows identical minElements and maxElements', () => {
    const output = loremMarksum({ minElements: 5, maxElements: 5 });
    assert.isString(output);
    assert.strictEqual(output.split('\n\n').length, 5);
  });

  it('throws if minElements is a string', () => {
    assert.throws(() => {
      loremMarksum({ minElements: 'my-string', maxElements: 10 });
    }, 'Must provide an integer for minElements: my-string');
  });

  it('throws if maxElements is a string', () => {
    assert.throws(() => {
      loremMarksum({ minElements: 10, maxElements: 'my-string' });
    }, 'Must provide an integer for maxElements: my-string');
  });

  it('throws if minElements is greater than maxElements', () => {
    assert.throws(() => {
      loremMarksum({ minElements: 10, maxElements: 5 });
    }, 'minElements (10) must be less than or equal to maxElements (5)');
  });
});
