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
});
