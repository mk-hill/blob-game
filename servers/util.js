const {
  fieldHeight, fieldWidth, minRadius, maxRadius,
} = require('./settings');

module.exports.random = {
  // Default usable directly if square playing field
  generateCoord(max = fieldHeight) {
    return Math.floor(Math.random() * max);
  },

  get x() {
    return this.generateCoord(fieldWidth);
  },

  get y() {
    return this.generateCoord(fieldHeight);
  },

  get color() {
    const randomVal = () => Math.floor(Math.random() * 200) + 50; // Not too dark
    return `rgb(${randomVal()}, ${randomVal()}, ${randomVal()})`;
  },

  get radius() {
    // return Math.round(Math.random() * (maxRadius - minRadius) + minRadius);
    return +(Math.random() * (maxRadius - minRadius) + minRadius).toFixed(1);
  },
};
