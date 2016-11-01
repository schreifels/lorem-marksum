'use strict';

function intInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  intInRange,
  fromArray
};
