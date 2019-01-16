const socket = io.connect('http://localhost:59768'); // io being exposed by socket.io server

// To be called when player begins game
function init() {
  // Start drawing canvas
  draw();
  socket.emit('init', {
    playerName: state.name,
  });
}

// No need to receive data before start game is clicked
socket.on('initAck', (blobs) => {
  state.blobs = blobs;
  // Inform server of vectors 30 times per second
  // Server to handle position/collision
  setInterval(() => {
    socket.emit('tick', {
      xVector: state.xVector,
      yVector: state.yVector,
    });
  }, 33);
});

// Receive players array and new location from server every 33ms
socket.on('tock', ({ players, x, y }) => {
  // console.log(players);
  state.players = players;
  state.x = x;
  state.y = y;
});
