// A new instance of Game
const startButton = document.querySelector("#btn__reset");
startButton.addEventListener("click", () => {
  game = new Game();
  game.startGame();
});
// Event delegation for onscreen keyboard buttons
const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    game.handleInteraction(event);
  }
});
// Event listener for physical keyboard input
document.addEventListener('keydown', (event) => {
  const keyPressed = event.key.toLowerCase();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
 // Check if the key pressed is a letter and if the game is ongoing 
  if (alphabet.includes(keyPressed) && !game.checkForWin() && game.activePhrase !== null) {
    game.handleInteractionByLetter(keyPressed);
  }
});


