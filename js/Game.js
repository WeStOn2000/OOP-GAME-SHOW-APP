class Game {
    constructor() {
      this.phrases = ['WOW!', 'Almost!', "Hmmm!","maybe!","try harder!"]; 
      this.activePhrase = null;
      this.missed = 0;
    }
  
    startGame() {
      this.resetGame(); 
      this.hideOverlay();
      this.activePhrase = this.getRandomPhrase();
      this.addPhraseToDisplay(this.activePhrase);
    }
  
    getRandomPhrase() {
      const randomIndex = Math.floor(Math.random() * this.phrases.length);
      return this.phrases[randomIndex];
    }
  
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
  
    removeLife() {
      const lives = document.querySelectorAll('.tries img');
      lives[this.missed].src = 'images/lostHeart.png';
      this.missed += 1;
  
      if (this.missed === 5) {
        this.gameOver('lose');
      }
    }
  
    checkForWin() {
      const letters = document.querySelectorAll('.letter');
      const shownLetters = document.querySelectorAll('.show');
      return letters.length === shownLetters.length;
    }
  
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
  
    hideOverlay() {
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'none';
    }
  
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
  
    showMatchedLetter(letter) {
      const matchedLetters = document.querySelectorAll(`.letter.${letter}`);
      matchedLetters.forEach(match => {
        match.classList.remove('hide');
        match.classList.add('show');
      });
    }
  
    resetGame() {
      const phraseList = document.getElementById('phrase').querySelector('ul');
      phraseList.innerHTML = '';
  
      const keys = document.querySelectorAll('.key');
      keys.forEach(key => {
        key.disabled = false;
        key.classList.remove('chosen', 'wrong');
      });
  
      const lives = document.querySelectorAll('.tries img');
      lives.forEach(life => {
        life.src = 'images/liveHeart.png';
      });
  
      this.missed = 0;
    }
  }
  
  
  
  
  
  
  