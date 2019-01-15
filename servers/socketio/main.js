/**
 * Main socket file
 * Other namespaces may branch off if necessary
 */

const { ioServer: server } = require('../createServers'); // Grab ioServer from servers/index.js
const Blob = require('../../classes/Blob');

const blobs = [];

function startGame() {
  // todo Creating blobs, adjust for multiple players later
  for (let i = 0; i < 500; i++) {
    blobs.push(new Blob());
  }
}

startGame();

server.on('connect', (socket) => {
  socket.emit('start', blobs);
});

module.exports = server;
