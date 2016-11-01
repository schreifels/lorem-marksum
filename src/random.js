'use strict';

function fromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  fromArray
};
