const state = {
  name: 'Guest',
  blobs: [],
  players: [],
}; // Only vectors and name to be stored here, position/speed/collision server-side

const scoreBoard = document.querySelector('.player-score');
const leaderBoard = document.querySelector('.leader-board');
const canvas = document.querySelector('#game-canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

$(window).load(() => {
  $('#loginModal').modal('show');
});

$('.name-form').submit((e) => {
  e.preventDefault();
  state.name = document.querySelector('#name-input').value;
  $('#loginModal').modal('hide');
  $('#spawnModal').modal('show');
  document.querySelector('.player-name').textContent = state.name;
});

$('.start-game').click((e) => {
  $('.modal').modal('hide');
  // Show game ui
  document.querySelectorAll('.hiddenOnStart').forEach(elem => elem.removeAttribute('hidden'));
  init(); // In socket.js until bundled
});

// To be called only after game has been started
function updateHUD() {
  const self = state.players.find(player => player.id === state.id);
  scoreBoard.textContent = self.score;
  leaderBoard.innerHTML = '';
  console.log(state.players);
  state.players
    .sort((p1, p2) => p2.score - p1.score)
    .forEach((player) => {
      const li = document.createElement('li');
      li.textContent = player.name;
      leaderBoard.appendChild(li);
    });
}
