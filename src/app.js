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
  console.log(coordinates);
  let apiKey = "a1549a69de61bb59ce707631479b255f";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  //   let sundayElement = document.querySelector("#sunday");
  //   sundayElement.innerHTML = Math.round(response.data.main.temp);
  //   let mondayElement = document.querySelector("#monday");
  //   mondayElement.innerHTML = Math.round(response.data.main.temp);
  //   let tuesdayElement = document.querySelector("#tuesday");
  //   tuesdayElement.innerHTML = Math.round(response.data.main.temp);
  //   let wednesdayElement = document.querySelector("#wednesday");
  //   wednesdayElement.innerHTML = Math.round(response.data.main.temp);
  //   let thursdayElement = document.querySelector("#thursday");
  //   thursdayElement.innerHTML = Math.round(response.data.main.temp);
  //   let fridayElement = document.querySelector("#friday");
  //   fridayElement.innerHTML = Math.round(response.data.main.temp);
  //   let saturdayElement = document.querySelector("#saturday");
  //   saturdayElement.innerHTML = Math.round(response.data.main.temp);
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
search("Ohio");
