let timerStart = null;
let intervalId = null;
let isPaused = false;
let passedTime = 0;

let startingText = "00:00:00.000";

let displayTime = document.querySelector(".time-display");

displayTime.textContent = startingText;

function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let milliseconds = Math.floor(ms % 1000);

  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0") +
    "." +
    milliseconds.toString().padStart(3, "0")
  );
}

// ******** Start Button ******** //

function startTime() {
  if (intervalId) {
    return;
  }
  if (isPaused) {
    isPaused = false;
    timerStart = Date.now() - passedTime;
  } else {
    passedTime = 0;
    timerStart = Date.now();
  }

  displayTime.textContent = formatTime(passedTime);

  intervalId = setInterval(() => {
    passedTime = Date.now() - timerStart;
    displayTime.textContent = formatTime(passedTime);
  }, 10);
}

document.querySelector(".start-btn").addEventListener("click", startTime);

// ******** Pause Button ******** //

function pauseTime() {
  if (intervalId) {
    isPaused = true;
    clearInterval(intervalId);
    intervalId = null;
    displayTime.textContent = formatTime(passedTime);
    return passedTime;
  } else return;
}

document.querySelector(".pause-btn").addEventListener("click", pauseTime);

// ******** Reset Button ******** //

function resetTime() {
  if (intervalId || isPaused) {
    pauseTime();
    if (confirm("Are you sure you want to reset the stopwatch?")) {
      timerStart = null;
      isPaused = false;
      passedTime = 0;
      displayTime.textContent = startingText;
    }
  }
}

document.querySelector(".reset-btn").addEventListener("click", resetTime);
