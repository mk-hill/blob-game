const state = {
  name: 'Guest',
  blobs: [],
  players: [],
};

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
