let currentTime = new Date();

let todayDate = document.querySelector("#today-date");

let date = currentTime.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];

let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let day = days[currentTime.getDay()];

todayDate.innerHTML = `${day}, ${date}th ${month}`;

let clockTime = document.querySelector("#clock-time");
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
clockTime.innerHTML = `${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let temp = document.querySelector("#temp-value");
  celsiusTemp = response.data.main.temp;
  let tempValue = Math.round(celsiusTemp);
  temp.innerHTML = `${tempValue}`;

  let humidity = document.querySelector("#humidity");
  let humidityValue = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityValue}`;

  let wind = document.querySelector("#wind");
  let windValue = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windValue}`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function search(cityInput) {
  let apiKey = `f3887e262c88d1158f7e2ef4998e234c`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}

function getCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `f3887e262c88d1158f7e2ef4998e234c`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showGeolocation(event) {
  navigator.geolocation.getCurrentPosition(getCoords);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-value");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-value");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let button = document.querySelector("geolocate");
geolocate.addEventListener("click", showGeolocation);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", citySubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
