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

server.on('connect', (socket) => {
  // A player has connected
  socket.on('init', (data) => {
    // Player started game
    const player = new Player(socket.id, data.playerName);
    players.push(player.public);
    console.log(players);
    socket.emit('initAck', blobs);
  });
});

module.exports = server;
