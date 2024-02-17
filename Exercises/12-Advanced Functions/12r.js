let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

/*
if(!score) {
score = {
  wins: 0,
  losses: 0,
  ties: 0
}
}
*/

updateScoreElement();

let isAutoPlaying = false;
let intervalId;


// const autoPlay = () => {

//};

function resetScore() {
  score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
}

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    resetConfirmation();
  });

  function resetConfirmation() {
      document.querySelector('.js-confirmation-message')
        .innerHTML = `
      Are you sure you want to reset the score? 
      <button class="js-yes-button reset-confirm-button">
        Yes
      </button>
      <button class="js-no-button reset-confirm-button">
        No
      </button>
      `;

      document.querySelector('.js-yes-button')
        .addEventListener('click', () => {
          resetScore();
          document.querySelector('.js-confirmation-message ')
      .innerHTML = '';
        });

        document.querySelector('.js-no-button')
        .addEventListener('click', () => {
          document.querySelector('.js-confirmation-message')
      .innerHTML = '';
        });
  }

document.querySelector('.js-autoplay-button')
  .addEventListener('click', () => {
    autoPlay();
  });

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;
    document.querySelector('.js-autoplay-button')
      .innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoplay-button')
    .innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetConfirmation();
  }
});

function playGame(playerMove) {
const computerMove = pickComputerMove();

let result = '';

if (playerMove === 'scissors') {
  if (computerMove === 'rock') {
    result = 'You Lose.';
  } else if (computerMove === 'paper') {
    result = 'You Win.';
  } else if (computerMove === 'scissors') {
    result = 'Tie.';
  }

} else if (playerMove === 'paper') {
  if (computerMove === 'rock') {
    result = 'You Win.';
  } else if (computerMove === 'paper') {
    result = 'Tie.';
  } else if (computerMove === 'scissors') {
    result = 'You Lose.';
  }
  
} else if (playerMove === 'rock') {
  if (computerMove === 'rock') {
    result = 'Tie.';
  } else if (computerMove === 'paper') {
    result = 'You Lose.';
  } else if (computerMove === 'scissors') {
    result = 'You Win.';
  }
}

if (result === 'You Win.') {
  score.wins += 1;
} else if (result === 'You Lose.') {
  score.losses += 1;
} else if (result === 'Tie.') {
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.   ties}`;
}

function pickComputerMove() {
const randomNumber = Math.random();

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
  computerMove = 'rock';
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
  computerMove = 'paper';
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
  computerMove = 'scissors';
}

return computerMove;
}