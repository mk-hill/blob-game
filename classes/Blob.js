class Blob {
  constructor() {
    this.color = Blob.getRandomColor();
    this.x = Blob.getRandomCoord();
    this.y = Blob.getRandomCoord();
    this.radius = 5;
  }

  // Assuming square playing field
  static getRandomCoord(fieldSize = 500) {
    return Math.floor(Math.random() * fieldSize);
  }

  static getRandomColor() {
    const randomVal = () => Math.floor(Math.random() * 200) + 50; // Not too dark
    return `rgb(${randomVal()}, ${randomVal()}, ${randomVal()})`;
  }
}

module.exports = Blob;
