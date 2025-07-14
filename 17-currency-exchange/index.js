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

async function getCurrencyFullName() {
  const namesObject = await fetchFromAPI(
    "https://api.frankfurter.dev/v1/currencies"
  );
  return namesObject;
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
  const countryNames = await getCurrencyFullName();
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
  const countryNames = await getCurrencyFullName();
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
  ).innerHTML = ` <h2>Base Currency: <span id="baseCurrency">${baseCurrency}(${baseCurrencyFullName})</span></h2>`;
}

const container = document.querySelector(".rates-data-container");
container.addEventListener("click", (event) => {
  const clickedRow = event.target.closest(".rates-row");
  if (!clickedRow) return;
  const selectedCurrency = clickedRow.dataset.currency;
  generateHTML(selectedCurrency);
});

generateHTML();
