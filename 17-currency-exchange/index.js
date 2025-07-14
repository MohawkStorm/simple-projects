async function fetchFromAPI(url) {
  const response = await fetch(url);
  return await response.json();
}

async function getCurrencyFullName() {
  const namesObject = await fetchFromAPI(
    "https://api.frankfurter.dev/v1/currencies"
  );
  return namesObject;
}

async function fetchExchangeRates() {
  const ratesObject = await fetchFromAPI(
    "https://api.frankfurter.dev/v1/latest?base=USD"
  );
  return ratesObject;
}

function getCountryFlagImg(currencyCode) {
  return `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${currencyCode
    .toLowerCase()
    .trim()}.svg`;
}

async function generateData() {
  let mainData = [];
  const countryNames = await getCurrencyFullName();
  let exchangeRates = await fetchExchangeRates();
  exchangeRates = Object.entries(exchangeRates.rates);
  exchangeRates.forEach(([code, rate]) => {
    const desc = countryNames[code];
    const img = getCountryFlagImg(code);
    mainData.push({ currency: code, desc, img, rate });
  });
  return mainData;
}

async function generateHTML() {
  const mainData = await generateData();
  let html = ``;
  mainData.forEach((data) => {
    html += `<div class="rates-row">
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
}
generateHTML();
