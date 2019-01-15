const socket = io.connect('http://localhost:59768');

socket.on('start', (blobs) => {
  player.blobs = blobs;
});
