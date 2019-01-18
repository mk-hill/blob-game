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
socket.on('initAck', ({ blobs, id }) => {
  state.blobs = blobs;
  state.id = id;
  // console.log(id);

  // Inform server of vectors 30 times per second?
  // Server to handle position/collision
  setInterval(() => {
    socket.emit('tick', {
      xVector: state.xVector,
      yVector: state.yVector,
    });
  }, 5);

  // Don't need to update ui as often
  setInterval(updateHUD, 300);
});

// Receive players array and new location from server every 33ms
socket.on('tock', (players) => {
  // console.log(players);
  state.players = players;

  // Update camera location
  const self = players.find(player => player.id === state.id);
  state.x = self.x;
  state.y = self.y;
});

// Someone absorbed a blob and it has been replaced. Update state for correct paint
socket.on('blobAbsorbed', ({ blobIndex, newBlob }) => {
  // console.log(blobIndex, newBlob);
  state.blobs.splice(blobIndex, 1, newBlob);
});
