const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const autoPlayBtn = document.getElementById("autoPlayBtn");
const resultCounter = document.getElementById("resultCounter");
const resultOf = document.getElementById("resultOf");
const vsImg = document.getElementById("vsImg");
const playerImg = document.getElementById("playerImg");
const computerImg = document.getElementById("computerImg");

// Local storage

let result = JSON.parse(localStorage.getItem(`resultLS`)) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
resultCounter.textContent = `Wins: ${result.wins}, Losses: ${result.losses}, Ties: ${result.ties}`;

// Computer move generator

function computerMove() {
  let cMove = ``;
  const randomNum = Math.floor(Math.random() * 3) + 1;
  if (randomNum == 1) {
    cMove = `rock`;
  } else if (randomNum == 2) {
    cMove = `paper`;
  } else if (randomNum == 3) {
    cMove = `scissors`;
  }
  return cMove;
}

//Main game part

function optionSelect(playerMove) {
  const cMove = computerMove();
  playerImg.src = `images/${playerMove}.png`;
  computerImg.src = `images/${cMove}.png`;

  if (playerMove === `rock`) {
    if (cMove === `rock`) {
      resultOf.textContent = `Tie!`;
      result.ties++;
    } else if (cMove === `paper`) {
      resultOf.textContent = `You Lost!`;
      result.losses++;
    } else if (cMove === `scissors`) {
      resultOf.textContent = `You Won!`;
      result.wins++;
    }
  } else if (playerMove === `paper`) {
    if (cMove === `rock`) {
      resultOf.textContent = `You Won!`;
      result.wins++;
    } else if (cMove === `paper`) {
      resultOf.textContent = `Tie!`;
      result.ties++;
    } else {
      resultOf.textContent = `You Lost!`;
      result.losses++;
    }
  } else if (playerMove === `scissors`) {
    if (cMove === `rock`) {
      resultOf.textContent = `You Lost!`;
      result.losses++;
    } else if (cMove === `paper`) {
      resultOf.textContent = `You Won!`;
      result.wins++;
    } else {
      resultOf.textContent = `Tie!`;
      result.ties++;
    }
  }
  resultCounter.textContent = `Wins: ${result.wins}, Losses: ${result.losses}, Ties: ${result.ties}`;
  localStorage.setItem(`resultLS`, JSON.stringify(result));
}

// Main buttons

rockBtn.onclick = () => optionSelect(`rock`);
paperBtn.onclick = () => optionSelect(`paper`);
scissorsBtn.onclick = () => optionSelect(`scissors`);

// Reset score button

resetScoreBtn.onclick = () => {
  result.wins = 0;
  result.losses = 0;
  result.ties = 0;
  resultOf.textContent = `Good Luck`;
  vsImg.textContent = `You vs. Computer`;
  resultCounter.textContent = `Wins: ${result.wins}, Losses: ${result.losses}, Ties: ${result.ties}`;
  localStorage.setItem("resultLS", JSON.stringify(result));
};

// AutoPlay button and function
let autoplayCheck = null;
autoPlayBtn.onclick = () => {
  if (autoPlayBtn.innerText === "Auto Play") {
    autoplayCheck = setInterval(() => {
      const moves = [`rock`, `paper`, `scissors`];
      let randomAutoMove = moves[Math.floor(Math.random() * 3)];
      optionSelect(randomAutoMove);
    }, 1000);
    autoPlayBtn.innerText = "Stop Auto Play";
  } else if (autoPlayBtn.innerText === "Stop Auto Play") {
    clearInterval(autoplayCheck);
    autoplayCheck = null;
    autoPlayBtn.innerText = "Auto Play";
  }
};
