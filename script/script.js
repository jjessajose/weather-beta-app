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

let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat,"];
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
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let temp = document.querySelector("#temp-value");
  let tempValue = Math.round(response.data.main.temp);
  temp.innerHTML = `${tempValue}°C`;
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

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", citySubmit);

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
let button = document.querySelector("button");
button.addEventListener("click", showGeolocation);
