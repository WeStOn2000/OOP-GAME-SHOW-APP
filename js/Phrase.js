class Phrase {
    constructor(phrase) {
      this.phrase = phrase.toLowerCase();
    }
  
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
  
    checkLetter(letter) {
      return this.phrase.includes(letter);
    }
  
    showMatchedLetter(letter) {
      const matchedLetters = document.querySelectorAll(`.letter.${letter}`);
      matchedLetters.forEach(match => {
        match.classList.remove('hide');
        match.classList.add('show');
      });
    }
  }