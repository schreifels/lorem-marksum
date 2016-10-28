'use strict';

const assert = require('chai').assert;
const Element = require('../src/element');

describe('Element', () => {
  describe('constructor', () => {
    it('only requires a type', () => {
      assert.doesNotThrow(() => {
        new Element('HEADER_1');
      });
    });

    it('sets the expected properties', () => {
      const parentElement = new Element('HEADER_1');
      const element = new Element('PARAGRAPH', parentElement);

      assert.strictEqual(element.type, 'PARAGRAPH');
      assert.strictEqual(element.parent, parentElement);
      assert.strictEqual(element.children.length, 0);
    });

    it('throws with a helpful error message if not provided a type', () => {
      assert.throws(() => {
        new Element();
      }, 'Element type is not optional.');
    });

    it('throws if provided an invalid type', () => {
      assert.throws(() => {
        new Element('NOT_A_REAL_ELEMENT_TYPE');
      }, '"NOT_A_REAL_ELEMENT_TYPE" is not a supported element type.');
    });
  });
});
