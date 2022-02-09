'use strict';

//Selecting elements by ID
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const btnRules = document.querySelector(`.btn--rules`);
const btnRuleTog = document.getElementById(`myPopup`);

//Starting condition
let scores, currentScore, activePlayer, playing;

const restart = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add(`hidden`);

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Css reset to zero
  player0El.classList.add(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--active`, `player--winner`);
};
// Start the game
restart();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//Rolling dice function
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //  1 generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2 display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    // 3 Check for 1
    if (dice !== 1) {
      // add current dice to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  // Add current to to active player score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check score is +. 100

    //Finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//btnNew games

btnNew.addEventListener(`click`, function () {
  restart();
});

btnRules.addEventListener(`click`, () => {
  btnRuleTog.classList.toggle('show');
});

// btnRuleTog.textContent = `1) Roll dice as many times as you want.
//    2) Click HOLD button to add current score to tatal and end your turn.
//    3) If you roll a 1 your turn ends and loose your current score.
//  4)First to 100 wins the game`;
