'use strict';

const ElementTypes = {
  '_ROOT': new Set(['HEADER_1']),
  'HEADER_1': new Set(['HEADER_2', 'HEADER_3', 'PARAGRAPH']),
  'HEADER_2': new Set(['HEADER_3', 'PARAGRAPH']),
  'HEADER_3': new Set(['PARAGRAPH']),
  'PARAGRAPH': new Set(['ORDERED_LIST', 'UNORDERED_LIST']),
  'ORDERED_LIST': new Set([]),
  'UNORDERED_LIST': new Set([])
};

module.exports = ElementTypes;
