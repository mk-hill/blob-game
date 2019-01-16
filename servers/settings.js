/**
 * Game settings
 */

module.exports = {
  playerDefaults: {
    speed: 7, // player start speed
    radius: 7, // player start size
    zoom: 1.6, // default player viewport zoom, will be changed as player grows
    borderWidth: 3, // player blob border width
  },

  fieldWidth: 1000, // playable area width
  fieldHeight: 1000, // playable area height

  blobs: 500, // number of blobs to populate the field with
  minRadius: 4, // min npc blob radius
  maxRadius: 5, // max npc blob radius
};
