let today = new Date();
let now = document.querySelector("#date");

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sartuday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[today.getMonth()];
let days = day[today.getDay()];
let dates = today.getDate();
let year = today.getFullYear();
let hour = today.getHours();
let minutes = today.getMinutes();

if (hour<10){
  hour =` 0 ${hour}`;}

if (minutes<10){
  minutes =`0 ${minutes}`;
}
now.innerHTML = `${days}</br> ${dates} ${month} ${year} </br> ${hour} : ${minutes}`;

function formatDay (timestamp){
let date = new Date (timestamp*1000);
let day = date.getDay();
let days =["Sunday", "Monday", "Tuesday" , "Wednesday", "Thursday", "Friday", "Saturday"];
return days[day];

}




function displayForecast(response){
let forecast= response.data.daily;
let forecastElement=document.querySelector("#forecast");
let forecastHTML="";
let days=["Sunday" , "Monday", "Tuesday"];
forecast.forEach(function (forecastDay) {
forecastHTML= forecastHTML +

`<div class="col">
    <div class="card">
  
      <div class="card-body">
        <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>

        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
         
        alt=""
        width="42"
        />
        <span class="temp">${Math.round(forecastDay.temp.max)}</span> 
        <span class="temp-min">${Math.round(forecastDay.temp.min)}</span>
      </div>
    </div>
  </div>`;})

  

forecastElement.innerHTML=forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#style-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);





getForecast(response.data.coord);

}



function searchCity(city) {
  let apiKey = "ce0282c2c853d472007f20d5c460d02c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 
 
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);
function cityName(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#inlineFormInputGroupUsername");
  searchCity(searchInput.value);
}

function searchLocation(position) {
  let apiKey = "ce0282c2c853d472007f20d5c460d02c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let locationButton = document.querySelector("#current-button");
locationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function degreeCelc() {
  let tempToday = document.querySelector("#select-temperature");
  tempToday.innerHTML = "28";
}
let celciusButton = document.querySelector("#celcious-degree");
celciusButton.addEventListener("click", degreeCelc);

function degreeFaren() {
  let tempToday = document.querySelector("#select-temperature");
  tempToday.innerHTML = "68";
}
let farenheitButton = document.querySelector("#farenheit-degree");
farenheitButton.addEventListener("click", degreeFaren);


searchCity("BULAWAYO");
displayForecast();
