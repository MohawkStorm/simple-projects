const passwordLength = document.getElementById("userNumber");
const includeLowerCase = document.getElementById("includeLowerCase");
const includeUpperCase = document.getElementById("includeUpperCase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const sumbitBtn = document.getElementById("sumbitBtn");
const GeneratedPassword = document.getElementById("GeneratedPassword");

function generatePassword() {
  const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=";
  let chars = "";
  let password = "";

  let length = Number(passwordLength.value);

  if (length <= 0) {
    GeneratedPassword.textContent = "Number must be more than 1";
    return;
  }

  if (
    !includeLowerCase.checked &&
    !includeUpperCase.checked &&
    !includeNumbers.checked &&
    !includeSymbols.checked
  ) {
    GeneratedPassword.textContent =
      "Please select at least one of the options above";
    return;
  }

  includeLowerCase.checked ? (chars += lowerCaseChar) : (chars += "");
  includeUpperCase.checked ? (chars += upperCaseChar) : (chars += "");
  includeNumbers.checked ? (chars += numbers) : (chars += "");
  includeSymbols.checked ? (chars += symbols) : (chars += "");

  for (let i = 0; i < length; i++) {
    let rng = Math.floor(Math.random() * chars.length);
    password += chars[rng];
  }

  GeneratedPassword.textContent = `The password is: ${password}`;

  return password;
}
