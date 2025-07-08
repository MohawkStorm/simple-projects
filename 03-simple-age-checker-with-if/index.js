const ageinput = document.getElementById("ageinput");

const ageoutputtext = document.getElementById("ageoutputtext");

const ageBtn = document.getElementById("ageBtn");

ageBtn.onclick = function () {
  const age = Number(ageinput.value);

  if (age == 0) {
    ageoutputtext.textContent = "You are way too young to be here";
  } else if (age >= 100) {
    ageoutputtext.textContent = "You are a 🦖";
  } else if (age >= 18) {
    ageoutputtext.textContent = "You are an adult";
  } else if (age < 18 && age > 0) {
    ageoutputtext.textContent = "You are NOT an adult yet";
  } else {
    ageoutputtext.textContent = "Try Again!";
  }
};
