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
  // let player = {};
  // Player started game
  socket.on('init', (data) => {
    socket.join('game'); // Add player to game namespace
    const player = new Player(socket.id, data.playerName);
    players.push(player.public); // store public data in array to be sent to every client
    // console.log(players);
    socket.emit('initAck', blobs); // send blobs on map to new player

    // Update every connected socket 30 times per second - 33ms
    // ! sending same player.x, player.y to everyone + duplicating interval on server for
    // ! each player this way - split server.to and socket or grab correct x,y in client
    // ! or assign id in public data on server instead
    setInterval(() => {
      server.to('game').emit('tock', {
        players, // Send every player's public info to this player
        x: player.x, // Send this players coordinates
        y: player.y,
      });
    }, 33);

    // Player sent a tick with their vectors
    socket.on('tick', (vectors) => {
      player.updateLocation(vectors);
    });
  });
});

module.exports = server;
