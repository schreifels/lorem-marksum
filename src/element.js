'use strict';

const loremIpsum = require('lorem-ipsum');

function generateHeader(level) {
  return '#'.repeat(level) + ' ' +
    loremIpsum({
      sentenceLowerBound: 1,
      sentenceUpperBound: 8
    })
    .slice(0, -1) // loremIpsum adds a trailing period
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function generateParagraph() {
  return loremIpsum({
    units: 'paragraphs'
  });
}

function generateList(isOrdered) {
  return loremIpsum({
      units: 'paragraphs'
    })
    .split('.')
    .slice(0, -1) // loremIpsum adds a trailing period
    .map((sentence) => {
      return `${isOrdered ? '1.' : '*'} ${sentence.trim()}`;
    })
    .join('\n');
}

function generate(elementType) {
  switch (elementType) {
    case 'HEADER_1':
      return generateHeader(1);
    case 'HEADER_2':
      return generateHeader(2);
    case 'HEADER_3':
      return generateHeader(3);
    case 'PARAGRAPH':
      return generateParagraph();
    case 'ORDERED_LIST':
      return generateList(true);
    case 'UNORDERED_LIST':
      return generateList(false);
  }
}

module.exports = {
  generate
};
