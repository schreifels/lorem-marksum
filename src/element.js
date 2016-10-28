'use strict';

const elementTypes = require('./elementTypes');

function Element(type, parent) {
  if (!type) {
    throw new Error('Element type is not optional.');
  }

  if (elementTypes.indexOf(type) === -1) {
    throw new Error(`"${type}" is not a supported element type.`);
  }

  this.type = type;
  this.parent = parent;
  this.children = [];
}

module.exports = Element;
