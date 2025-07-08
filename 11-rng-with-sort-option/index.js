const results = document.getElementById("results");
const generateNumBtn = document.getElementById("generateNumBtn");
const resetBtn = document.getElementById("resetBtn");
const sortBtn = document.getElementById("sortBtn");
const autoGenBtn = document.getElementById("autoGenBtn");
const progressStatus = document.getElementById("progressStatus");
const actionStatus = document.getElementById("actionStatus");

let minNumber = 1;
let maxNumber = 100;
let autoGenInterval;
let actionStatusTimeOut;
let isAutoGenerating = false;

let numbers = JSON.parse(localStorage.getItem("generatedNumberLS")) || [];
numbersDisplay();

updateProgress();
updateBtnStatus();

autoGenBtn.innerText = `Auto Generate ${maxNumber - numbers.length} Numbers`;

function actionStatusHTML(message) {
  clearTimeout(actionStatusTimeOut);
  actionStatus.innerText = message;
  if (!isAutoGenerating) {
    actionStatusTimeOut = setTimeout(() => {
      actionStatus.innerText = "";
    }, 2000);
  }
}

function updateProgress() {
  progressStatus.innerText = `Progress: ${numbers.length} / ${maxNumber}`;
}

function updateBtnStatus() {
  sortBtn.disabled = numbers.length <= 0 || isAutoGenerating;
  generateNumBtn.disabled = numbers.length >= maxNumber || isAutoGenerating;
  updateGenerateNumberHTML();
}

function autoGenerateNumbers() {
  let remainingNumbers = maxNumber - numbers.length;
  if (remainingNumbers <= 0) {
    updateBtnStatus();
    return;
  }
  isAutoGenerating = true;
  updateBtnStatus();

  generateNumBtn.disabled = true;

  let counter = 0;
  autoGenInterval = setInterval(() => {
    if (counter >= remainingNumbers) {
      actionStatusHTML("✅ Auto-generation complete!");
      isAutoGenerating = false;
      clearInterval(autoGenInterval);
      updateBtnStatus();
    } else {
      numberGenerator();
      counter++;
    }
  }, 200);
}

function updateGenerateNumberHTML() {
  if (!isAutoGenerating) {
    autoGenBtn.innerText = `Auto Generate ${
      maxNumber - numbers.length
    } Numbers`;
    autoGenBtn.classList.remove("stopGeneratingBtn");
  } else {
    autoGenBtn.classList.add("stopGeneratingBtn");
    autoGenBtn.innerText = `Stop Generating Numbers`;
  }
}

function sortNumbers() {
  numbers.sort((a, b) => a - b);
  numbersDisplay();
  localStorage.setItem("generatedNumberLS", JSON.stringify(numbers));
}

function numberGenerator() {
  if (numbers.length >= maxNumber) {
    alert(`You've generated every number from ${minNumber} to ${maxNumber}!`);
    updateBtnStatus();
    return;
  } else {
    let randomNum;
    do {
      randomNum =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    } while (numbers.includes(randomNum));

    numbers.push(randomNum);
    updateProgress();
    numbersDisplay();
    updateGenerateNumberHTML();
    updateBtnStatus();
    localStorage.setItem("generatedNumberLS", JSON.stringify(numbers));
  }
}

function numbersDisplay() {
  results.innerHTML = "";
  numbers.forEach((element) => {
    results.innerHTML += `
      <div class="numberBox">
        <div class="numberValue">${element}</div>
        <button class="deleteBtn">Delete</button>
      </div>
    `;
  });
  document.querySelectorAll(".deleteBtn").forEach((deleteBtns, index) => {
    deleteBtns.addEventListener(`click`, () => {
      actionStatusHTML(`🗑️ ${numbers[index]} removed`);
      numbers.splice(index, 1);
      numbersDisplay();
      updateBtnStatus();
      updateProgress();
      localStorage.setItem("generatedNumberLS", JSON.stringify(numbers));
    });
  });
}

function resetNumbers() {
  if (isAutoGenerating) {
    clearInterval(autoGenInterval);
    isAutoGenerating = false;
    updateGenerateNumberHTML();
  }

  numbers = [];
  updateProgress();
  numbersDisplay();
  updateGenerateNumberHTML();
  generateNumBtn.disabled = numbers.length >= maxNumber;
  localStorage.setItem("generatedNumberLS", JSON.stringify(numbers));
  updateBtnStatus();
}

generateNumBtn.addEventListener(`click`, () => {
  numberGenerator();
  actionStatusHTML("✅ Number generated successfully");
});
resetBtn.addEventListener(`click`, () => {
  if (confirm("Are you sure you want to reset all numbers?")) {
    resetNumbers();
    actionStatusHTML("🧹 List cleared. Start fresh");
  }
});
sortBtn.addEventListener(`click`, () => {
  sortNumbers();
  if (numbers.length >= 2) {
    actionStatusHTML("📂 Numbers arranged");
  }
});
autoGenBtn.addEventListener(`click`, () => {
  if (!isAutoGenerating) {
    autoGenerateNumbers();
    actionStatusHTML("⚙️ Auto-generation in progress...");
  } else {
    clearInterval(autoGenInterval);
    isAutoGenerating = false;
    updateBtnStatus();
    actionStatusHTML("🛑 Auto-generation stopped");
  }
});
