const userTempNumber = document.getElementById("userTempNumber");
const toFarenheit = document.getElementById("toFarenheit");
const toCelsius = document.getElementById("toCelsius");
const userTempBtn = document.getElementById("userTempBtn");
const resultMessage = document.getElementById("resultMessage");

let result;

userTempBtn.onclick = function () {
  let inputNumber = userTempNumber.value;

  if (isNaN(inputNumber) || inputNumber === "") {
    resultMessage.textContent = "Please enter a number.";
    return;
  }
  inputNumber = Number(inputNumber);
  if (toFarenheit.checked) {
    result = (inputNumber * 9) / 5 + 32;
    resultMessage.textContent = `${inputNumber}°C is ${result.toFixed(2)}°F`;
  } else if (toCelsius.checked) {
    result = ((inputNumber - 32) * 5) / 9;
    resultMessage.textContent = `${inputNumber}°F is ${result.toFixed(2)}°C`;
  } else {
    resultMessage.textContent = "You Must Select A Unit";
  }
};
