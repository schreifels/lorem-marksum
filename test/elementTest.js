'use strict';

const element = require('../src/element');
const assert = require('chai').assert;

describe('element', () => {
  describe('#_generateHeader', () => {
    context('level 1', () => {
      it('returns a valid header', () => {
        const header = element.generate('HEADER_1');
        assert.match(header, /^# ([A-Z][a-z]+ ?)+$/);
        assert.strictEqual(header, header.trim());
      });
    });

    context('level 2', () => {
      it('returns a valid header', () => {
        const header = element.generate('HEADER_2');
        assert.match(header, /^## ([A-Z][a-z]+ ?)+$/);
        assert.strictEqual(header, header.trim());
      });
    });

    context('level 3', () => {
      it('returns a valid header', () => {
        const header = element.generate('HEADER_3');
        assert.match(header, /^### ([A-Z][a-z]+ ?)+$/);
        assert.strictEqual(header, header.trim());
      });
    });
  });

  describe('#_generateParagraph', () => {
    it('returns a valid paragraph', () => {
      const paragraph = element.generate('PARAGRAPH');
      assert.match(paragraph, /^[a-z\. ]+$/i);
      assert.strictEqual(paragraph, paragraph.trim());
    });
  });

  describe('#_generateList', () => {
    context('ordered', () => {
      it('returns a valid list', () => {
        element.generate('ORDERED_LIST').split('\n').forEach((line) => {
          assert.strictEqual(line.slice(0, 3), '1. ');
          assert.strictEqual(line, line.trim());
        });
      });
    });

    context('unordered', () => {
      it('returns a valid list', () => {
        element.generate('UNORDERED_LIST').split('\n').forEach((line) => {
          assert.strictEqual(line.slice(0, 2), '* ');
          assert.strictEqual(line, line.trim());
        });
      });
    });
  });
});
