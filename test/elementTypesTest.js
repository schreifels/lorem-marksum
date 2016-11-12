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

      context('when last element', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(elementTypes.forNextElement([], true),
                            ['HEADER_1']);
        });
      });
    });

    context('with previousElementType of HEADER_1', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(elementTypes.forNextElement(['HEADER_1']),
                          ['HEADER_2', 'PARAGRAPH']);
      });

      context('when last element', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(elementTypes.forNextElement(['HEADER_1'], true),
                            ['PARAGRAPH']);
        });
      });
    });

    context('with previousElementType of HEADER_2', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(elementTypes.forNextElement(['HEADER_2']),
                          ['HEADER_3', 'PARAGRAPH']);
      });

      context('when last element', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(elementTypes.forNextElement(['HEADER_2'], true),
                            ['PARAGRAPH']);
        });
      });
    });

    context('with previousElementType of HEADER_3', () => {
      it('returns the correct element types', () => {
        assert.deepEqual(elementTypes.forNextElement(['HEADER_3']),
                          ['PARAGRAPH']);
      });

      context('when last element', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(elementTypes.forNextElement(['HEADER_3'], true),
                            ['PARAGRAPH']);
        });
      });
    });

    context('with previousElementType of PARAGRAPH', () => {
      context('with no header ancestors', () => {
        it('returns the correct element types', () => {
          assert.deepEqual(elementTypes.forNextElement(['PARAGRAPH']),
                            ['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
        });

        context('when last element', () => {
          it('returns the correct element types', () => {
            assert.deepEqual(elementTypes.forNextElement(['PARAGRAPH'], true),
                              ['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
          });
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

        context('when last element', () => {
          it('returns the correct element types', () => {
            assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'PARAGRAPH', 'PARAGRAPH'], true),
                              ['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
            assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'PARAGRAPH', 'PARAGRAPH'], true),
                              ['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
            assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', 'PARAGRAPH'], true),
                              ['PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']);
          });
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

          context('when last element', () => {
            it('returns the correct element types', () => {
              assert.deepEqual(elementTypes.forNextElement([previousElementType], true),
                                ['PARAGRAPH']);
            });
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

          context('when last element', () => {
            it('returns the correct element types', () => {
              assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'PARAGRAPH', previousElementType], true),
                                ['PARAGRAPH']);
              assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'PARAGRAPH', previousElementType], true),
                                ['PARAGRAPH']);
              assert.deepEqual(elementTypes.forNextElement(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', previousElementType], true),
                                ['PARAGRAPH']);
            });
          });
        });
      });
    });
  });

  describe('#weightsFor', () => {
    it('returns an array of the correct weights', () => {
      assert.deepEqual(
        elementTypes.weightsFor(['HEADER_1', 'HEADER_2', 'HEADER_3', 'PARAGRAPH', 'ORDERED_LIST', 'UNORDERED_LIST']),
        [1, 1, 1, 10, 1, 1]
      );
    });

    it('does not care about order', () => {
      assert.deepEqual(
        elementTypes.weightsFor(['ORDERED_LIST', 'HEADER_1', 'PARAGRAPH']),
        [1, 1, 10]
      );
    });

    it('returns an empty array when given no element types', () => {
      assert.deepEqual(elementTypes.weightsFor([]), []);
    });

    it('throws when given an invalid elementType', () => {
      assert.throws(() => {
        elementTypes.weightsFor(['INVALID_ELEMENT_TYPE']);
      }, '"INVALID_ELEMENT_TYPE" is not a recognized element type');
    });
  });

  describe('#generate', () => {
    it('returns the correct number of element types', () => {
      console.log(elementTypes.generate(5));
      assert.strictEqual(elementTypes.generate(5).length, 5);
    });
  });
});
