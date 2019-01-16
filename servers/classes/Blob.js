/**
 * Edible npc blobs
 */
const { blobs } = require('../settings');
const { random } = require('../util');

class Blob {
  constructor() {
    this.color = random.color;
    this.x = random.x;
    this.y = random.y;
    this.radius = random.radius;
  }

  // Return an array of specified number of blobs
  static create(n = blobs) {
    return Array(n)
      .fill()
      .map(() => new Blob());
  }
}

module.exports = Blob;
