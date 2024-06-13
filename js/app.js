const game = new Game();

const startButton = document.querySelector('.btn__reset');
startButton.addEventListener('click', () => {
  game.startGame();
});

const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    game.handleInteraction(event);
  }
});

document.addEventListener('keydown', (event) => {
  const keyPressed = event.key.toLowerCase();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  if (alphabet.includes(keyPressed) && !game.checkForWin() && game.activePhrase !== null) {
    game.handleInteractionByLetter(keyPressed);
  }
});


