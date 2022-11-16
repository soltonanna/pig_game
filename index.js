let activePlayer = 0;
let currentScore = 0;

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

function clearScore(element) {
  element.textContent = 0;
  return element;
}

/** Change player */
const changePlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

/** Reset the game  */
const restartGame = () => {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceImg.classList.add('hidden');

  document.querySelectorAll('.score').forEach((element) => clearScore(element));
  document.querySelectorAll('.current-score').forEach((element) => clearScore(element));
};

/** Roll the dice */
btnRoll.addEventListener('click', (e) => {
  e.preventDefault();

  diceImg.classList.remove('hidden');
  const diceRandom = Math.trunc((Math.random() * 6) + 1);
  diceImg.src = `media/dice-${diceRandom}.png`;

  if (diceRandom !== 1) {
    currentScore += diceRandom;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    changePlayer();
  }
});

/** Hold the score */
btnHold.addEventListener('click', (e) => {
  e.preventDefault();

  let mainScore = +(document.getElementById(`score--${activePlayer}`).textContent);
  mainScore += +(document.getElementById(`current--${activePlayer}`).textContent);
  document.getElementById(`score--${activePlayer}`).textContent = mainScore;

  if (mainScore <= 50) {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    diceImg.classList.add('hidden');
    changePlayer();
  } else {
    // eslint-disable-next-line no-alert
    alert(`${document.getElementById(`name--${activePlayer}`).textContent} is WIN !!!`);
    restartGame();
  }
});

/** Start the new game */
btnNew.addEventListener('click', (e) => {
  e.preventDefault();
  restartGame();
});
