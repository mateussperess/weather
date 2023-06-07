const apiKey = "0ad24f658930ed65c9175a7a2a3521e4";
const countryFlags = `https://flagsapi.com/:country_code/flat/64.png`;

const unsplashApiKey = "8_JrN-pdBVtxjOia09vf6iCn0OAQZwki42Y5ZL0MhJY";

const cityInput = document.querySelector("#city-input");
const btnSearch = document.querySelector("#search");

const weatherData = document.querySelector("#weather-data");

const cityElement = document.querySelector("#city-name"); // CITY_NAME
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const countryElement = document.querySelector("#country");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");


// functions
const getWeatherData = async(city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
  //                     https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=0ad24f658930ed65c9175a7a2a3521e4
  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
} 

const getCityImage = async(cityElement) => {
  let apiPhotoURL = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${cityElement}&orientation=landscape`;
  let res = await fetch(apiPhotoURL);
  let data = await res.json();

  console.log(data.results[0]);
  return data.results[0];
}

const showWeatherData = async(city) => {
  let data = await getWeatherData(city);

  let dataImage = await getCityImage(city);
  let bodyElement = document.body;

  // console.log(dataImage.urls.full);

  bodyElement.style.backgroundImage = `${dataImage.urls.full}`;
  

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", 
   `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );

  countryElement.setAttribute("src",
    `https://flagsapi.com/${data.sys.country}/flat/64.png`
  );

  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherData.classList.remove("hide");
  weatherData.classList.add("weather-data");

  console.log(data);
}

// events

btnSearch.addEventListener("click", (e) => {
  e.preventDefault;
  const city = cityInput.value;

  showWeatherData(city);
}); 

cityInput.addEventListener("keyup", (e) => {
  if(e.code === "Enter") {
    let city = e.target.value;

    showWeatherData(city);
  }
});

