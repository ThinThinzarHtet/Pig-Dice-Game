'use strict';

let scores, currentScore, activePlayer, playing;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let winnerText = document.createElement('p');
winnerText.textContent = 'You Win !';
winnerText.style.color = '#c7365f';
winnerText.style.fontSize = '25px';
winnerText.style.marginBottom = 'auto';
winnerText.style.fontWeight = '700';
winnerText.setAttribute('id', 'winner');

const init = function() {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    
    playing = true;

    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    document.getElementById(`score--0`).style.marginBottom='auto';

    document.getElementById(`score--1`).style.marginBottom='auto';
}

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        

        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
    if (playing) {
    //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3. Check dice is 1 or not
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch to next player
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function() {
    if (playing) {
        //1. Add Current Score to Global Score 
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            // If == 100, finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            playing = false;

            let current = document.querySelector(`.player--${activePlayer}`);
            let currentdiv = document.querySelector(`.player--${activePlayer} .current`)
            
            // insert a new node after global score 
            current.insertBefore(winnerText, currentdiv);
            document.getElementById(`score--${activePlayer}`).style.marginBottom='0';
        
        } else {
            // Else switch to next player
            switchPlayer();
        }
    }
    
})

//reset the game
btnNew.addEventListener('click', function() {
    init();
    const e = document.getElementById('winner');
    e.parentElement.removeChild(e);
});

// How to play button
const btnHowToPlay = document.querySelector('.btn--howtoplay');
const ruleBox = document.querySelector('.modal');
const btncloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
    ruleBox.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function () {
    ruleBox.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnHowToPlay.addEventListener('click', openModal);

btncloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);