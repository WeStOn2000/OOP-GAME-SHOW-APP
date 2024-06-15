//this code  is the actual phrase the Phrase object is representing
class Phrase {
    constructor(phrase) {
      this.phrase =  phrase.toLowerCase();
    }
  // this code adds letter placeholders to the display when the game starts.
    addPhraseToDisplay() {
      const phraseList = document.getElementById('phrase').querySelector('ul');
      phraseList.innerHTML = '';
      for (let i = 0; i < this.phrase.length; i++) {
        const li = document.createElement('li');
        if (this.phrase[i] === ' ') {
          li.className = 'space';
        } else {
          li.textContent = this.phrase[i];
          li.className = `hide letter ${this.phrase[i]}`;
        }
        phraseList.appendChild(li);
      }
    }
//this code checks to see if the letter selected by the player matches a letter in the phrase.  
    checkLetter(letter) {
      return this.phrase.includes(letter);
    }
//this code reveals the letter(s) on the board that matches the player's selection  
    showMatchedLetter(letter) {
      const matchedLetters = document.querySelectorAll(`.letter.${letter}`);
      matchedLetters.forEach(match => {
        match.classList.remove('hide');
        match.classList.add('show');
      });
    }
  }