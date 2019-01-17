const Blob = require('./classes/Blob');
const {
  blobScore,
  speedTick,
  sizeTick,
  playerSizeMult,
  minSpeed,
  playerScoreBonus,
} = require('./settings').absorption;
// const { ioServer: server } = require('./index');

// ! currently only detecting 1 collision, fix when moving into class
function checkForBlobCollisions(player, blobs) {
  const { public: pub, private: priv } = player;
  return new Promise((resolve, reject) => {
    // BLOB COLLISIONS
    blobs.forEach((blob, i) => {
      // console.log("CHECK FOR COLLISIONS")
      // AABB Test(square)  - Axis-aligned bounding boxes
      if (
        player.x + pub.radius + blob.radius > blob.x
        && player.x < blob.x + pub.radius + blob.radius
        && player.y + pub.radius + blob.radius > blob.y
        && player.y < blob.y + pub.radius + blob.radius
      ) {
        // Pythagoras test(circle)
        distance = Math.sqrt(
          (player.x - blob.x) * (player.x - blob.x) + (player.y - blob.y) * (player.y - blob.y),
        );
        if (distance < pub.radius + blob.radius) {
          // COLLISION!
          pub.score += blobScore;
          pub.blobsAbsorbed += 1;
          // pub.color = blob.color;
          if (priv.zoom > 1) {
            priv.zoom -= 0.001;
          }
          pub.radius += sizeTick;
          if (priv.speed < -minSpeed) {
            priv.speed += speedTick;
          } else if (priv.speed > minSpeed) {
            priv.speed -= speedTick;
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

function checkForPlayerCollisions(player, players) {
  const { public: pub, private: priv } = player;
  return new Promise((resolve, reject) => {
    // PLAYER COLLISIONS
    players.forEach((p2, i) => {
      if (p2.uid != pub.uid) {
        // console.log(p2.uid,pub.uid)
        const pR = p2.radius;
        // AABB Test - Axis-aligned bounding boxes
        if (
          pub.x + pub.radius + pR > p2.x
          && pub.x < p2.x + pub.radius + pR
          && pub.y + pub.radius + pR > p2.y
          && pub.y < p2.y + pub.radius + pR
        ) {
          // Pythagoras test
          distance = Math.sqrt((pub.x - p2.x) * (pub.x - p2.x) + (pub.y - p2.y) * (pub.y - p2.y));
          if (distance < pub.radius + pR) {
            // COLLISION
            if (pub.radius > pR) {
              // ENEMY DEATH
              const collisionData = updateScores(player, p2);
              if (priv.zoom > 1) {
                priv.zoom -= pR * 0.25 * 0.001;
              }
              players.splice(i, 1);
              resolve(collisionData);
            } else if (pub.radius < pR) {
              const collisionData = updateScores(p2, player);
              players.forEach((p, i) => {
                console.log(players[i].name, i);
                if (pub.uid == p.uid) {
                  players.splice(i, 1);
                }
              });
              resolve(collisionData);
            }
          }
        }
      }
    });
    reject();
  });
}

// Only public data comes in for eaten player from players array
// Grabbing public data out of eater
function updateScores({ public: eater }, eaten) {
  eater.score += eaten.score + playerScoreBonus;
  eater.playersAbsorbed += 1;
  eaten.isAlive = false;
  eater.radius += eaten.radius * playerSizeMult;
  return {
    died: eaten,
    eatenBy: eater,
  };
}

module.exports = { checkForBlobCollisions, checkForPlayerCollisions };
