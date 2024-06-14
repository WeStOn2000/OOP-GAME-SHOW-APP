//this code Here we will define the Game class, which will be responsible for managing the game's state, logic, and interactions.
class Game {
    constructor(phrases , missed , activePhrase) {
//this code is an array of five Phrase objects to use with the game.
        this.phrases = ['WOW', 'Almost', "Hmmm","maybe","try harder"]; 
      //This code is the Phrase object that’s currently in play.
        this.activePhrase = null;

      this.missed = 0;
      //this code above is used to track the number of missed guesses by the player.
    }
  //hides the start screen overlay
    startGame() {
      this.resetGame(); 
      this.hideOverlay();
      this.activePhrase = this.getRandomPhrase();
      this.addPhraseToDisplay(this.activePhrase);
    }
 //this method randomly retrieves one of the phrases stored in the phrases array and returns it.
 getRandomPhrase() {
      const randomIndex = Math.floor(Math.random() * this.phrases.length);
      return this.phrases[randomIndex];
    }
 /*this method controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase, 
 and then directs the game based on a correct or incorrect guess. */ 
    handleInteraction(event) {
      const selectedLetter = event.target.textContent;
      this.handleInteractionByLetter(selectedLetter);
    }
  
    handleInteractionByLetter(selectedLetter) {
      const keys = document.querySelectorAll('.key');
      const selectedKey = Array.from(keys).find(key => key.textContent === selectedLetter);
  
      if (!this.activePhrase.includes(selectedLetter)) {
        selectedKey.classList.add('wrong');
        this.removeLife();
      } else {
        selectedKey.classList.add('chosen');
        this.showMatchedLetter(selectedLetter);
        if (this.checkForWin()) {
          this.gameOver('win');
        }
      }
      selectedKey.disabled = true;
    }
  // this method removes a life from the scoreboard.
    removeLife() {
      const lives = document.querySelectorAll('.tries img');
      lives[this.missed].src = 'images/lostHeart.png';
      this.missed += 1;
  
      if (this.missed === 5) {
        this.gameOver('lose');
      }
    }
 // this method checks to see if the player has revealed all of the letters in the active phrase. 
    checkForWin() {
      const letters = document.querySelectorAll('.letter');
      const shownLetters = document.querySelectorAll('.show');
      return letters.length === shownLetters.length;
    }
  // this method checks to see if the player has revealed all of the letters in the active phrase.
    gameOver(outcome) {
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'flex';
      const message = overlay.querySelector('h1');
  
      if (outcome === 'win') {
        message.textContent = 'You Win!';
        overlay.className = 'win';
      } else {
        message.textContent = 'Sorry, you lost!';
        overlay.className = 'lose';
      }
    }
  //this code here hides the overlay.
    hideOverlay() {
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'none';
    }
  //To display a given phrase on the game board by creating li elements for each character in the phrase.
    addPhraseToDisplay(phrase) {
      const phraseList = document.getElementById('phrase').querySelector('ul');
      phraseList.innerHTML = '';
      for (let i = 0; i < phrase.length; i++) {
        const li = document.createElement('li');
        if (phrase[i] === ' ') {
          li.className = 'space';
        } else {
          li.textContent = phrase[i].toLowerCase();
          li.className = `hide letter ${phrase[i].toLowerCase()}`;
        }
        phraseList.appendChild(li);
      }
    }
 //To reveal all instances of a specific letter in the displayed phrase. 
    showMatchedLetter(letter) {
      const matchedLetters = document.querySelectorAll(`.letter.${letter}`);
      matchedLetters.forEach(match => {
        match.classList.remove('hide');
        match.classList.add('show');
      });
    }
    // Reset phrase display
    resetGame() {
      const phraseList = document.getElementById('phrase').querySelector('ul');
      phraseList.innerHTML = '';
  // Enable onscreen keyboard buttons and reset classes
      const keys = document.querySelectorAll('.key');
      keys.forEach(key => {
        key.disabled = false;
        key.classList.remove('chosen', 'wrong');
      });
   // Reset missed count
      const lives = document.querySelectorAll('.tries img');
      lives.forEach(life => {
        life.src = 'images/liveHeart.png';
      });
   // Reset missed count
      this.missed = 0;
    }
  }
  
  
  
  
  
  
  