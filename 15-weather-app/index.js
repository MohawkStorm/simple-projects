// API key and global variables
const apiKey = "cf5d1bfb6e2bef313e4db75febc947c1";
let userLocation;
let url;
let isCelsius = true;
let lastWeatherData = null;

// Convert Celsius temperature to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

// Initialize unit toggle button and add click event listener
let unitToggleButton = document.querySelector(".temp-unit-btn");
unitToggleButton.textContent = isCelsius ? "Convert to °F" : "Convert to °C";
unitToggleButton.addEventListener("click", () => {
  isCelsius = !isCelsius;
  unitToggleButton.textContent = isCelsius ? "Convert to °F" : "Convert to °C";

  if (lastWeatherData) {
    renderHTML(lastWeatherData);
  }
});

// ****** Fetch weather data from API and extract needed fields ****** //
async function apiFetch(url) {
  let weatherFetchData = await fetch(url);
  weatherFetchData = await weatherFetchData.json();
  const locationData = {
    name: weatherFetchData.name,
    temp: weatherFetchData.main.temp,
    feelsLike: weatherFetchData.main.feels_like,
    description: weatherFetchData.weather[0].description,
    icon: weatherFetchData.weather[0].icon,
    humidity: weatherFetchData.main.humidity,
    wind: weatherFetchData.wind.speed,
  };

  return locationData;
}

// ****** Get user input for location ****** //
function userLocationinput() {
  let searchedLocation = document.querySelector(".locationInput").value;
  return searchedLocation;
}

// ****** Generate and render the weather HTML based on current data ****** //
async function generateHTML() {
  userLocation = userLocationinput();
  url = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&APPID=${apiKey}&units=metric`;
  const weatherData = await apiFetch(url);
  lastWeatherData = weatherData;
  renderHTML(weatherData);
  document.querySelector(".locationInput").value = "";
}

// ****** Render weather data to the DOM ****** //
function renderHTML(weatherData) {
  let weatherHTML = `
        <div class="weather-info">
          <h2 class="location-name">${weatherData.name}</h2>
          <div class="temp">
            <span class="temp-value">  ${
              isCelsius
                ? Math.round(weatherData.temp)
                : celsiusToFahrenheit(weatherData.temp)
            }</span><sup>°${isCelsius ? "C" : "F"}</sup>
          </div>
          <div class="details">
            <p class="description">${
              weatherData.description.charAt(0).toUpperCase() +
              weatherData.description.slice(1)
            }</p>
            <p class="feels-like">Feels like:   ${
              isCelsius
                ? Math.round(weatherData.feelsLike)
                : celsiusToFahrenheit(weatherData.feelsLike)
            }°${isCelsius ? "C" : "F"}</p>
            <p class="humidity">Humidity: ${weatherData.humidity}%</p>
            <p class="wind-speed">Wind speed: ${weatherData.wind} m/s</p>
          </div>
          <img src="https://openweathermap.org/img/wn/${
            weatherData.icon
          }@2x.png" alt="${weatherData.description}">
        </div>
      `;

  document.querySelector(".weather-result").innerHTML = weatherHTML;
}

// ****** Event listeners for search button and Enter key press ****** //
document.querySelector(".searchBtn").addEventListener("click", generateHTML);
document
  .querySelector(".locationInput")
  .addEventListener("keydown", (button) => {
    if (button.key === "Enter") {
      generateHTML();
    }
  });
