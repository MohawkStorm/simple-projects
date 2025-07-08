const result = document.getElementById("result");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const b4 = document.getElementById("b4");
const b5 = document.getElementById("b5");
const b6 = document.getElementById("b6");
const b7 = document.getElementById("b7");
const b8 = document.getElementById("b8");
const b9 = document.getElementById("b9");
const b0 = document.getElementById("b0");
const bPlus = document.getElementById("bPlus");
const bMinus = document.getElementById("bMinus");
const bTimes = document.getElementById("bTimes");
const bDivide = document.getElementById("bDivide");
const bPoint = document.getElementById("bPoint");
const bEqual = document.getElementById("bEqual");
const bClear = document.getElementById("bClear");

let calculation = "";
let lastChar;

function operatorLimit() {
  lastChar = calculation.trim().slice(-1);
  return !".+-*/".includes(lastChar);
}

b1.onclick = () => {
  calculation += "1";
  result.textContent = calculation;
};

b2.onclick = () => {
  calculation += "2";
  result.textContent = calculation;
};

b3.onclick = () => {
  calculation += "3";
  result.textContent = calculation;
};

b4.onclick = () => {
  calculation += "4";
  result.textContent = calculation;
};

b5.onclick = () => {
  calculation += "5";
  result.textContent = calculation;
};

b6.onclick = () => {
  calculation += "6";
  result.textContent = calculation;
};

b7.onclick = () => {
  calculation += "7";
  result.textContent = calculation;
};

b8.onclick = () => {
  calculation += "8";
  result.textContent = calculation;
};

b9.onclick = () => {
  calculation += "9";
  result.textContent = calculation;
};

b0.onclick = () => {
  calculation += "0";
  result.textContent = calculation;
};

bPlus.onclick = () => {
  if (!operatorLimit()) {
    alert("You can't add multiple Operators back to back");
    return;
  }
  calculation += ` + `;
  result.textContent = calculation;
};

bMinus.onclick = () => {
  if (!operatorLimit()) {
    alert("You can't add multiple Operators back to back");
    return;
  }
  calculation += ` - `;
  result.textContent = calculation;
};

bTimes.onclick = () => {
  if (!operatorLimit()) {
    alert("You can't add multiple Operators back to back");
    return;
  }
  calculation += ` * `;
  result.textContent = calculation;
};

bDivide.onclick = () => {
  if (!operatorLimit()) {
    alert("You can't add multiple Operators back to back");
    return;
  }
  calculation += ` / `;
  result.textContent = calculation;
};

bPoint.onclick = () => {
  if (!operatorLimit()) {
    alert("You can't add multiple Operators back to back");
    return;
  }
  calculation += `.`;
  result.textContent = calculation;
};

bClear.onclick = () => {
  calculation = ``;
  result.textContent = calculation;
};

bEqual.onclick = () => {
  lastChar = calculation.trim().slice(-1);
  if (".+-*/".includes(lastChar)) {
    calculation = calculation.slice(0, -1).trim();
  }
  result.textContent = eval(calculation);
};
