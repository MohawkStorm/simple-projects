let currentTime = new Date();
let timerStart = 0;
let passedTime = 0;

let displayTime = document.querySelector(".time-display");

document.querySelector(".start-btn").addEventListener("click", () => {
  let milliseconds = currentTime.getMilliseconds();
  displayTime.textContent = milliseconds;
});
