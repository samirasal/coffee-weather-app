function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
let city = "Ohio";

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  //   console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let weatherCondition = document.querySelector("#description");
  weatherCondition.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  //   let iconElement = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `src/weathericons/${response.data.weather[0].icon}.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  // console.log(response.data.daily);

  let sundayElement = document.querySelector("#sunday");
  sundayElement.innerHTML = Math.round(forecast[1].temp.max);
  let sundayIcon = document.querySelector("#sunday-weather-logo");
  sundayIcon.setAttribute(
    "src",
    `src/weathericons/${forecast[1].weather[0].icon}.png`
  );

  let mondayElement = document.querySelector("#monday");
  mondayElement.innerHTML = Math.round(forecast[2].temp.max);
  let mondayIcon = document.querySelector("#monday-weather-logo");
  mondayIcon.setAttribute(
    "src",
    `src/weathericons/${forecast[2].weather[0].icon}.png`
  );

  let tuesdayElement = document.querySelector("#tuesday");
  tuesdayElement.innerHTML = Math.round(forecast[3].temp.max);
  let tuesdayIcon = document.querySelector("#tuesday-weather-logo");
  tuesdayIcon.setAttribute(
    "src",
    `src/weathericons/${forecast[3].weather[0].icon}.png`
  );

  let wednesdayElement = document.querySelector("#wednesday");
  wednesdayElement.innerHTML = Math.round(forecast[4].temp.max);
  let wednesdayIcon = document.querySelector("#wednesday-weather-logo");
  wednesdayIcon.setAttribute(
    "src",
    `src/weathericons/${forecast[4].weather[0].icon}.png`
  );

  let thursdayElement = document.querySelector("#thursday");
  thursdayElement.innerHTML = Math.round(forecast[5].temp.max);

  let thursdayIcon = document.querySelector("#thursday-weather-logo");
  thursdayIcon.setAttribute(
    "src",
    `src/weathericons/${forecast[5].weather[0].icon}.png`
  );

  let fridayElement = document.querySelector("#friday");
  fridayElement.innerHTML = Math.round(forecast[6].temp.max);

  let fridayIcon = document.querySelector("#friday-weather-logo");
  fridayIcon.setAttribute(
    "src",
    `src/weathericons/${forecast[6].weather[0].icon}.png`
  );

  let saturdayElement = document.querySelector("#saturday");
  saturdayElement.innerHTML = Math.round(forecast[7].temp.max);
  let saturdayIcon = document.querySelector("#saturday-weather-logo");
  saturdayIcon.setAttribute(
    "src",
    `src/weathericons/${forecast[7].weather[0].icon}.png`
  );
}

function search(city) {
  let apiKey = "a1549a69de61bb59ce707631479b255f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1549a69de61bb59ce707631479b255f&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitConversion = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitConversion);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("Philadelphia");

// function changeWeatherIcons(response) {
//   let iconElement = document.querySelector("#icon");
//   iconElement.setAttribute(
//     "src",
//     `weathericons/${response.data.weather[0].icon}.png`
//   );
//   let sunnyElement = document.querySelector("01d");
//   sunnyElement.setAttribute("src", "src/weathericons/moon.png");
//   let weatherIcon = document.querySelectorAll(".weather-icon");
//   weatherIcon = response.data.weather[0].icon;
//   if (weatherIcon === "01d") {
//     weatherIcon.innerHTML = "src/weathericons/sunny.png";
//   } else if (weatherIcon === "02d") {
//     return iconElement.setAttribute("src", "src/weathericons/moon.png");
//   }
// }
