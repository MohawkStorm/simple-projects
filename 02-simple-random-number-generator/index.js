// Dice

const dicerollBtn = document.getElementById("diceBtn");
const dicerng = document.getElementById("dicerng");

const mindice = 1;
const maxdice = 6;

dicerollBtn.onclick = function () {
  diceroll = Math.floor(Math.random() * maxdice) + mindice;

  dicerng.textContent = diceroll;
};

// RNG

const normalrngBtn = document.getElementById("normalrngBtn");
const normalrng = document.getElementById("normalrng");

const minrng = 40;
const maxrng = 120;

normalrngBtn.onclick = function () {
  randomNum = Math.floor(Math.random() * (maxrng - minrng + 1)) + minrng;

  normalrng.textContent = randomNum;
};

//Triple RNG

const triplerngBtn = document.getElementById("triplerngBtn");

const triplerng1 = document.getElementById("triplerng1");
const triplerng2 = document.getElementById("triplerng2");
const triplerng3 = document.getElementById("triplerng3");

triplerngBtn.onclick = function () {
  random3Num1 = Math.floor(Math.random() * 100) + 1;
  random3Num2 = Math.floor(Math.random() * 100) + 1;
  random3Num3 = Math.floor(Math.random() * 100) + 1;

  triplerng1.textContent = random3Num1;
  triplerng2.textContent = random3Num2;
  triplerng3.textContent = random3Num3;
};
