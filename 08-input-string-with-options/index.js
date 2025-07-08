const userNumber = document.getElementById("userNumber");
const turnLowerCase = document.getElementById("turnLowerCase");
const turnUpperCase = document.getElementById("turnUpperCase");
const userNames = document.getElementById("userNames");
const userNamesInput = document.getElementById("userNamesInput");
const sumbitBtn = document.getElementById("sumbitBtn");
const resultNames = document.getElementById("resultNames");
const userNumberSection = document.getElementById("userNumberSection");
const userNameSection = document.getElementById("userNameSection");
const nameAmount = document.getElementById("nameAmount");

let namesNumber;

let names = [];

sumbitBtn.onclick = function () {
  // Number of Names
  if (userNumberSection.style.display !== "none") {
    namesNumber = Number(userNumber.value);
    if (namesNumber <= 0) {
      alert("Please type a valid number first");
      userNumber.value = "";
      return;
    }
    userNumberSection.style.display = "none";
    userNameSection.style.display = "block";
    return;
  }
  //Names
  if (userNamesInput.value === "") {
    alert("Please Enter a Name");
    return;
  }

  let name = userNamesInput.value.trim();

  if (turnLowerCase.checked) {
    name = name.charAt(0).toLowerCase() + name.slice(1);
  } else if (turnUpperCase.checked) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  names.push(name);

  userNamesInput.value = "";

  nameAmount.textContent = `${names.length}/${namesNumber}`;

  renderNames(names);

  if (names.length == namesNumber) {
    userNamesInput.disabled = true;
    sumbitBtn.disabled = true;
    userNameSection.style.display = "none";
    sumbitBtn.textContent = `Limit Reached`;
  }
};

function lowerCase(array) {
  array.forEach((element, index, arr) => {
    arr[index] = element.charAt(0).toLowerCase() + element.slice(1);
  });
}

function upperCase(array) {
  array.forEach((element, index, arr) => {
    arr[index] = element.charAt(0).toUpperCase() + element.slice(1);
  });
}

turnLowerCase.addEventListener("change", function () {
  if (turnLowerCase.checked) {
    turnUpperCase.checked = false;
    lowerCase(names);
    renderNames(names);
  }
});

turnUpperCase.addEventListener("change", function () {
  if (turnUpperCase.checked) {
    turnLowerCase.checked = false;
    upperCase(names);
    renderNames(names);
  }
});

function renderNames(array) {
  resultNames.innerHTML = array
    .map((name, index) => `${index + 1}. ${name}`)
    .join("  |  ");
}
