const Blob = require('./classes/Blob');
// const { blobs: numBlobs } = require('./settings');
// const { ioServer: server } = require('./index');

// ! currently only detecting 1 collision, fix when moving into class
function checkForBlobCollisions(player, blobs) {
  const { public, private, x, y } = player;
  return new Promise((resolve, reject) => {
    // BLOB COLLISIONS
    blobs.forEach((blob, i) => {
      // console.log("CHECK FOR COLLISIONS")
      // AABB Test(square)  - Axis-aligned bounding boxes
      if (
        player.x + public.radius + blob.radius > blob.x &&
        player.x < blob.x + public.radius + blob.radius &&
        player.y + public.radius + blob.radius > blob.y &&
        player.y < blob.y + public.radius + blob.radius
      ) {
        // Pythagoras test(circle)
        distance = Math.sqrt(
          (player.x - blob.x) * (player.x - blob.x) + (player.y - blob.y) * (player.y - blob.y),
        );
        if (distance < public.radius + blob.radius) {
          // COLLISION!!!
          public.score += 1;
          public.blobsAbsorbed += 1;
          // public.color = blob.color;
          if (private.zoom > 1) {
            private.zoom -= 0.001;
          }
          public.radius += 0.25;
          if (private.speed < -0.005) {
            private.speed += 0.005;
          } else if (private.speed > 0.005) {
            private.speed -= 0.005;
          }
          // we have to keep blobs updated for new players
          // we just dont want to push them out more than we have to
          // so mutating here for now
          blobs.splice(i, 1, new Blob());
          // can't hit more than one blob on a tick so return
          resolve(i);
        }
      }
    });
    // if we got out of the loop, there was no collision.
    // Reject promise
    reject();
  });
}

module.exports = { checkForBlobCollisions };
