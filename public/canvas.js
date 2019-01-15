function init() {
  draw();
}

//
// ─── DRAWING ────────────────────────────────────────────────────────────────────
// * Dummy data to be replaced later

// todo ensure proper ui pointer events so player can move normally while mousing over

// Random starting coords
player.x = Math.floor(500 * Math.random() + 10);
player.y = Math.floor(500 * Math.random() + 10);

function draw() {
  context.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  context.clearRect(0, 0, canvas.width, canvas.height); // wipe prior frame

  // Lock view on player blob
  const viewX = canvas.width / 2 - player.x;
  const viewY = canvas.height / 2 - player.y;
  context.translate(viewX, viewY); // is cumulative, needs to be reset

  context.beginPath(); // start drawing
  context.fillStyle = 'rgb(255,255,0)'; // fill color

  // Draw arc around
  // Params (center x, center y, radius, starting angle, ending angle)
  context.arc(player.x, player.y, 10, 0, Math.PI * 2);
  // context.arc(100, 100, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = 'rgb(240,240,0)'; // border
  context.stroke();

  // Draw 'npc' blobs
  player.blobs.forEach((blob) => {
    context.beginPath(); // separate start for each blob
    context.fillStyle = blob.color;
    context.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw); // keep drawing
}

canvas.addEventListener('mousemove', (e) => {
  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };

  // Get angle relative to player blob
  const angleDeg = (Math.atan2(mouse.y - canvas.height / 2, mouse.x - canvas.width / 2) * 180) / Math.PI;

  // let xVector;
  // let yVector;

  if (angleDeg >= 0 && angleDeg < 90) {
    // mouse in lower right quadrant
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    // mouse in lower left quadrant
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    // mouse in upper left quadrant
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    // mouse in upper right quadrant
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  speed = 10;
  xV = xVector;
  yV = yVector;

  // Only move while player is not trying to go off grid
  if ((player.x < 5 && player.xVector < 0) || (player.x > 500 && xV > 0)) {
    player.y -= speed * yV;
  } else if ((player.y < 5 && yV > 0) || (player.y > 500 && yV < 0)) {
    player.x += speed * xV;
  } else {
    player.x += speed * xV;
    player.y -= speed * yV;
  }
});
