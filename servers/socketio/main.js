/**
 * Main socket file
 * Other namespaces may branch off if necessary
 */

const { ioServer: server } = require('../createServers'); // Grab ioServer from servers/index.js

const { Blob, Player } = require('../classes');

const blobs = Blob.create();
const players = [];

// function startGame() {
//   // todo Creating blobs, adjust for multiple players later
//   for (let i = 0; i < 500; i++) {
//     blobs.push(new Blob());
//   }
// }

// startGame();

// A player has connected
server.on('connect', (socket) => {
  let player = {};
  // Player started game
  socket.on('init', (data) => {
    socket.join('game'); // Add player to game namespace
    player = new Player(socket.id, data.playerName);
    players.push(player.public); // store public data in array to be sent to every client
    // console.log(players);
    socket.emit('initAck', blobs); // send blobs on map to new player

    // Update every connected socket 30 times per second - 33ms
    setInterval(() => {
      server.to('game').emit('tock', {
        players, // Send every player's public info to this player
        x: player.x, // Send this players coordinates
        y: player.y,
      });
    }, 33);

    // Player sent a tick with their vectors
    socket.on('tick', (vectors) => {
      const { speed } = player.private;
      const { xVector, yVector } = player.updateVectors(vectors);
      // console.log(xVector, yVector, player.x, player.y);

      // Only move while player is not trying to go off grid
      // todo change based on field size setting
      if ((player.x < 5 && xVector < 0) || (player.x > 500 && xVector > 0)) {
        player.y -= speed * yVector;
      } else if ((player.y < 5 && yVector > 0) || (player.y > 500 && yVector < 0)) {
        player.x += speed * xVector;
      } else {
        player.x += speed * xVector;
        player.y -= speed * yVector;
      }
    });
  });
});

module.exports = server;
