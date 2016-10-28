'use strict';

const elementTypes = require('./elementTypes');

const ValidChildrenByElementType = {
  [elementTypes._ROOT]: new Set([elementTypes.HEADER_1]),
  [elementTypes.HEADER_1]: new Set([elementTypes.HEADER_2, elementTypes.HEADER_3, elementTypes.PARAGRAPH]),
  [elementTypes.HEADER_2]: new Set([elementTypes.HEADER_3, elementTypes.PARAGRAPH]),
  [elementTypes.HEADER_3]: new Set([elementTypes.PARAGRAPH]),
  [elementTypes.PARAGRAPH]: new Set([elementTypes.ORDERED_LIST, elementTypes.UNORDERED_LIST]),
  [elementTypes.ORDERED_LIST]: new Set([]),
  [elementTypes.UNORDERED_LIST]: new Set([])
};

module.exports = ValidChildrenByElementType;
