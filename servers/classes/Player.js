/**
 * All player data
 */
const {
  playerDefaults: { speed, radius, zoom },
} = require('../settings');
const { random } = require('../util');

// Master player class to hold all data, including socket ID for server side only
class Player {
  constructor(socketId, name = 'Guest') {
    this.socketId = socketId;
    this.public = new PublicData(name);
    this.private = new PrivateData();
  }

  // Update vectors with data from client and return current vectors
  // Extend to modify vectors before returning if needed
  updateVectors(data) {
    const { xVector, yVector } = data;
    this.private.xVector = xVector;
    this.private.yVector = yVector;
    return data;
  }

  get x() {
    return this.public.x;
  }

  get y() {
    return this.public.y;
  }

  set x(val) {
    this.public.x = val;
  }

  set y(val) {
    this.public.y = val;
  }
}

// Private player data for use between server and player themselves
class PrivateData {
  constructor() {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = speed;
    this.zoom = zoom;
  }
}

// Player data that is to be shared with all other players
class PublicData {
  constructor(name) {
    this.name = name;
    this.x = random.x; // Random starting coords
    this.y = random.y;
    this.color = random.color; // could be extended with customization
    this.radius = radius;
    this.score = 0;
  }
}

module.exports = Player;
