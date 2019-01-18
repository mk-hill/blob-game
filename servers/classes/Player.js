/**
 * All player data
 */
const { playerDefaults, fieldHeight, fieldWidth } = require('../settings');
const { random } = require('../util');

// Master player class to hold all data,
// ! Socket id added to public data, generate separate uuid instead if this turns out to be a problem
class Player {
  constructor(socketId, name = 'Guest') {
    this.public = new PublicData(socketId, name);
    this.private = new PrivateData();
  }

  updateLocation(vectors) {
    const { speed } = this.private;
    const { xVector, yVector } = vectors;

    // Update vectors
    this.private.xVector = xVector;
    this.private.yVector = yVector;

    // Location validated in setters
    this.x += speed * xVector;
    this.y -= speed * yVector;
  }

  get x() {
    return this.public.x;
  }

  get y() {
    return this.public.y;
  }

  get id() {
    return this.public.id;
  }

  set x(val) {
    if (val > fieldWidth) {
      this.public.x = fieldWidth;
    } else if (val < 0) {
      this.public.x = 0;
    } else {
      this.public.x = val;
    }
  }

  set y(val) {
    if (val > fieldHeight) {
      this.public.y = fieldHeight;
    } else if (val < 0) {
      this.public.y = 0;
    } else {
      this.public.y = val;
    }
  }
}

// Private player data for use between server and player themselves
class PrivateData {
  constructor() {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = playerDefaults.speed;
    this.zoom = playerDefaults.zoom;
  }
}

// Player data that is to be shared with all other players
class PublicData {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.x = random.x; // Random starting coords
    this.y = random.y;
    this.radius = playerDefaults.radius;
    this.score = 0;

    this.blobsAbsorbed = 0;
    this.playersAbsorbed = 0;

    // This data doesn't change after player creation
    // Don't need to send it all each tock, could split
    this.color = random.color; // could be extended with customization
    this.borderColor = random.color;
    this.borderWidth = playerDefaults.borderWidth;
  }
}

module.exports = Player;
