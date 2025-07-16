// Caches the name of currencies and their countries

let cachedNames = {};

async function getCurrencyFullName() {
  const namesObject = await fetchFromAPI(
    "https://api.frankfurter.dev/v1/currencies"
  );
  return namesObject;
}

async function cacheNames() {
  cachedNames = await getCurrencyFullName();
}

// Initializer function

async function init() {
  await cacheNames();
  await generateHTML();
}

// Fetcher data from api based on base currency

function getCurrentBaseCurrency() {
  return document.querySelector(".baseCurrency")?.dataset.currency;
}

async function fetchFromAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
}

async function fetchExchangeRates(currency) {
  let baseCurrency = currency ? currency : "USD";
  const ratesObject = await fetchFromAPI(
    `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}`
  );
  return ratesObject;
}

function getCountryFlagImg(currencyCode) {
  return `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${currencyCode
    .toLowerCase()
    .trim()}.svg`;
}

async function generateData(currency) {
  let mainData = [];
  const countryNames = cachedNames;
  let exchangeRates = await fetchExchangeRates(currency);
  exchangeRates = Object.entries(exchangeRates.rates);
  exchangeRates.forEach(([code, rate]) => {
    const desc = countryNames[code];
    const img = getCountryFlagImg(code);
    mainData.push({ currency: code, desc, img, rate });
  });
  return mainData;
}

async function generateHTML(currency) {
  const mainData = await generateData(currency);
  let baseCurrency = currency ? currency : "USD";
  const countryNames = cachedNames;
  const baseCurrencyFullName = countryNames[baseCurrency] || "";
  let html = ``;
  mainData.forEach((data) => {
    html += `<div class="rates-row" data-currency="${data.currency}" title="Click to select ${data.currency} as Base Currency">
                    <div class="rates-cell">${data.currency}</div>
                    <div class="rates-cell description-cell">
                        <img src="${data.img}"
                            alt="${data.currency} Flag" />
                            ${data.desc}
                    </div>
                    <div class="rates-cell">${data.rate}</div></div>
              `;
  });
  document.querySelector(".rates-data-container").innerHTML = html;
  document.querySelector(
    ".base-currency-html"
  ).innerHTML = ` <h2>Base Currency: <span class="baseCurrency" data-currency="${baseCurrency}">${baseCurrency} (${baseCurrencyFullName})</span></h2>`;
}

const container = document.querySelector(".rates-data-container");
container.addEventListener("click", (event) => {
  const clickedRow = event.target.closest(".rates-row");
  if (!clickedRow) return;
  const selectedCurrency = clickedRow.dataset.currency;
  generateHTML(selectedCurrency);
  searchInput.value = "";
});

// Search events

const searchInput = document.querySelector(".currencySearch");
const matchHTML = document.querySelector(".suggestions-list");
searchInput.addEventListener("input", () => {
  const baseCurrency = getCurrentBaseCurrency();
  const value = searchInput.value.toLowerCase().trim();
  if (!value) {
    matchHTML.innerHTML = "";
    return;
  }
  const matchedNames = Object.entries(cachedNames).filter(([code, name]) => {
    if (code === baseCurrency) return false;
    return (
      code.toLowerCase().includes(value) || name.toLowerCase().includes(value)
    );
  });
  let html = ``;
  matchedNames.forEach(([code, name]) => {
    html += `<li data-currency="${code}">
    <img src="https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${code
      .toLowerCase()
      .trim()}.svg" 
         alt="${code} flag" width="24" height="18" />
    ${code} - ${name}
  </li>`;
  });
  matchHTML.innerHTML = html;
});

matchHTML.addEventListener("click", (event) => {
  const clickedList = event.target.closest("li");
  if (!clickedList) {
    return;
  }
  const currencyCode = clickedList.dataset.currency;
  generateHTML(currencyCode);
  searchInput.value = "";
  matchHTML.innerHTML = "";
});

document.addEventListener("click", (event) => {
  if (
    !matchHTML.contains(event.target) &&
    !searchInput.contains(event.target)
  ) {
    matchHTML.innerHTML = "";
  }
});

init();
