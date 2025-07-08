const gameNumberDesc = document.getElementById("gameNumberDesc");
const userNumber = document.getElementById("userNumber");
const numberBtn = document.getElementById("numberBtn");
const resetBtn = document.getElementById("resetBtn");
const attemptsLeft = document.getElementById("attemptsLeft");
const revealNumber = document.getElementById("revealNumber");

let minNumber = 1;
let maxNumber = 100;
let startAttempts = 10;
let attempts = 10;
let inputNumber;

let answer =
  Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

gameNumberDesc.textContent = `Guess the number between ${minNumber} - ${maxNumber}`;

function updateAttempts() {
  attemptsLeft.textContent = `Attempts: ${attempts}/${startAttempts}`;
}
updateAttempts();

// Reset game function

function resetGame() {
  answer = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  userNumber.disabled = false;
  numberBtn.disabled = false;
  attempts = startAttempts;
  userNumber.value = "";
  revealNumber.textContent = "Good Luck!";
  resetBtn.style.display = "none";
  updateAttempts();
}

resetBtn.onclick = function () {
  resetGame();
};

// End of Reset game function

numberBtn.onclick = function () {
  inputNumber = Number(userNumber.value);

  if (inputNumber == "") {
    window.alert(`Please enter a Number`);
    return;
  }

  if (
    inputNumber < minNumber ||
    inputNumber > maxNumber ||
    isNaN(inputNumber)
  ) {
    window.alert(
      `Invalid Number, Number must be between ${minNumber} - ${maxNumber}`
    );
    return;
  }

  attempts--;
  updateAttempts();

  if (inputNumber == answer) {
    revealNumber.textContent = `Congrats! You guessed right, The number was ${answer}`;
    userNumber.disabled = true;
    numberBtn.disabled = true;
    resetBtn.style.display = "block";
  } else if (attempts <= 0) {
    revealNumber.textContent = `You Failed to guess the number! The number was ${answer}`;
    userNumber.disabled = true;
    numberBtn.disabled = true;
    resetBtn.style.display = "block";
  } else if (inputNumber > answer) {
    revealNumber.textContent = `${inputNumber}, Too high!`;
  } else if (inputNumber < answer) {
    revealNumber.textContent = `${inputNumber}, Too low!`;
  }

  userNumber.value = "";
};
