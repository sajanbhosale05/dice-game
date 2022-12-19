//Handling Key Event's
/*
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    alert("Bhai pahale Functionality to add kr..!!");
  }
});*/
"use strict";
//Selecting Element's;
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Condition's
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

//Initial page Load
init();

//Switching the Player

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Dice roll Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generating random number betwiin 1 and 0
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying a Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //Checking for a rolled 1
    if (dice !== 1) {
      //add dice to current roll
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Winner of the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switching the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
