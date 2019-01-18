/**
 * Game settings
 */

module.exports = {
  playerDefaults: {
    speed: 1, // player start speed
    radius: 7, // player start size
    zoom: 1.6, // default player viewport zoom, will be changed as player grows
    borderWidth: 3, // player blob border width
  },

  absorption: {
    blobScore: 1, // score per 'npc' blob eaten
    speedTick: 0.005, // speed loss increment
    sizeTick: 0.25, // size increase per 'npc' blob eaten
    playerSizeMult: 0.25, // how much of a players size you gain when you eat them
    playerScoreBonus: 10, // bonus score gained for eating a player
    minSpeed: 0.01, // minimum player speed
  },

  fieldWidth: 1000, // playable area width
  fieldHeight: 1000, // playable area height

  blobs: 500, // number of blobs to populate the field with
  minRadius: 4, // min npc blob radius
  maxRadius: 5, // max npc blob radius
};
