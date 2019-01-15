const player = {};

const canvas = document.querySelector('#game-canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

$(window).load(() => {
  $('#loginModal').modal('show');
});

$('.name-form').submit((e) => {
  e.preventDefault();
  player.name = document.querySelector('#name-input').value;
  $('#loginModal').modal('hide');
  $('#spawnModal').modal('show');
  document.querySelector('.player-name').textContent = player.name;
});

$('.start-game').click((e) => {
  $('.modal').modal('hide');
  // Show game ui
  document.querySelectorAll('.hiddenOnStart').forEach(elem => elem.removeAttribute('hidden'));
  init(); // In canvas.js until bundled
});
