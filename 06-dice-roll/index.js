const diceNumberInput = document.getElementById("diceNumberInput");
const rollBtn = document.getElementById("rollBtn");
const resultMessage = document.getElementById("resultMessage");
const resultImage = document.getElementById("resultImage");

function rollDice() {
  let inputValue = Number(diceNumberInput.value);
  let diceValues = [];
  let diceImages = [];
  for (let i = 0; i < inputValue; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    diceValues.push(value);
    diceImages.push(`<img src="Dice_Images/Dice ${value}.png">`);
  }
  resultMessage.textContent = diceValues.join(", ");
  resultImage.innerHTML = diceImages.join("");
}
