/**
 * Main socket file
 * Other namespaces may branch off if necessary
 */

const { ioServer: server } = require('../createServers'); // Grab ioServer from servers/index.js

const { Blob, Player } = require('../classes');
const { checkForBlobCollisions, checkForPlayerCollisions } = require('../collision');

const blobs = Blob.create();
const players = [];

// function startGame() {
//   // todo Creating blobs, adjust for multiple players later
//   for (let i = 0; i < 500; i++) {
//     blobs.push(new Blob());
//   }
// }

// startGame();

// Update every connected socket 30 times per second - 33ms
setInterval(() => {
  if (players.length) {
    server.to('game').emit('tock', players); // Send every player's public info to every player
  }
}, 15);

// A player has connected
server.on('connect', (socket) => {
  // let player = {};
  // Player started game
  socket.on('init', (data) => {
    socket.join('game'); // Add player to game namespace
    const player = new Player(socket.id, data.playerName);
    players.push(player.public); // store public data in array to be sent to every client
    // console.log(players);
    socket.emit('initAck', { blobs, id: player.id }); // send blobs on map to new player
    // setInterval(() => {
    //   socket.emit('cameraUpdate', {
    //     // could find in client side by sending ids for players
    //     x: player.x,
    //     y: player.y,
    //   });
    // }, 12);

    // Player sent a tick with their vectors
    socket.on('tick', (vectors) => {
      player.updateLocation(vectors);
      const absorbedBlob = checkForBlobCollisions(player, blobs);
      absorbedBlob
        .then((blobIndex) => {
          // collision happened, emit the orb to be replaced to all sockets
          server.to('game').emit('blobAbsorbed', { blobIndex, newBlob: blobs[blobIndex] });
        })
        .catch((e) => {
          // console.log(e);
        });
      const playerDeath = checkForPlayerCollisions(player, players);
      playerDeath
        .then((data) => {
          // Players collided
          console.log(data);
        })
        .catch((e) => {
          // console.log(e);
        });
    });
  });
});

module.exports = server;
