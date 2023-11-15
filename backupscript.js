import { weatherDescriptions } from "./weatherDescriptions.js";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
const geoAPI = "https://geocoding-api.open-meteo.com/v1/search?name=";

let geoData = [];
let weatherData = [];

initApp();

async function fetchData() {
    geoData = await getGeoData();
    weatherData = await getWeatherData();

    generateWeatherForecast()
}

function initApp() {
    addListeners();
}

function addListeners() {
    const form = document.querySelector("#search-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        fetchData();
    });
}

async function getGeoData() {
    const cityInput = document.querySelector("#cities-input");
    const city = cityInput.value;

    const response = await fetch(geoAPI + encodeURI(city));
    const data = await response.json();
    return data.results[0];
}

async function getWeatherData() {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + geoData.latitude + "&longitude=" + geoData.longitude +"&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,cloud_cover,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max");
    const data = await response.json();
    return data;
}

async function generateWeatherForecast() {
    const d = new Date();
    let hour = d.getHours();

    const forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = "";

    const weatherSearchElement = document.querySelector("#main-content");
    weatherSearchElement.style.height = "200px";
    console.log(weatherData);
    
    const currentForecastElement = document.querySelector("#forecast-today");
    currentForecastElement.innerHTML = "";
    currentForecastElement.classList.add("flex");
    currentForecastElement.addEventListener("click", showHourlyForecast);
    const currentWeather = weatherDescriptions[weatherData.daily.weather_code[0]];

    if (weatherData.current.is_day) document.body.children[0].style.backgroundImage = "url(" + weatherDescriptions[weatherData.daily.weather_code[0]].day.background + ")";
    else document.body.children[0].style.backgroundImage = "url(" +  weatherDescriptions[weatherData.daily.weather_code[0]].night.background + ")";

    //CREATE TITEL SECTION
    const cityTitelElement = document.createElement("section");
    cityTitelElement.classList.add("weather-section-title", "flex");

    const h2TitleElement = document.createElement("h2");
    h2TitleElement.textContent = geoData.name;
    cityTitelElement.appendChild(h2TitleElement);

    currentForecastElement.prepend(cityTitelElement);

    //CREATE FRONTSIDE CURRENT WEATHER
    const currentForecastFrontElement = document.createElement("section");
    currentForecastFrontElement.classList.add("weather-section-current-front");

    const flexElementCurrentWeather = document.createElement("div");
    flexElementCurrentWeather.classList.add("flex");

    const h2ElementDay = document.createElement("h2");
    h2ElementDay.textContent = "Today";
    flexElementCurrentWeather.appendChild(h2ElementDay);

    const h2ElementDescription = document.createElement("h2");
    if (weatherData.current.is_day) h2ElementDescription.textContent = currentWeather.day.description;
    else h2ElementDescription.textContent = currentWeather.night.description;
    flexElementCurrentWeather.appendChild(h2ElementDescription);

    const imgElement = document.createElement("img");
    if (weatherData.current.is_day) imgElement.src = currentWeather.day.image;
    else imgElement.src = currentWeather.night.image;
    imgElement.alt = "current weather image";
    imgElement.classList.add("large");
    flexElementCurrentWeather.appendChild(imgElement);

    const containerElementCurrentWeatherInfo = document.createElement("div");
    const h2Element = document.createElement("h2");
    h2Element.textContent = weatherData.current.temperature_2m + weatherData.current_units.temperature_2m;
    containerElementCurrentWeatherInfo.appendChild(h2Element);

    const pElementTemperatureFeel = document.createElement("p");
    pElementTemperatureFeel.textContent = "Feel: " + weatherData.hourly.apparent_temperature[hour] + weatherData.daily_units.temperature_2m_min;
    containerElementCurrentWeatherInfo.appendChild(pElementTemperatureFeel);

    const pElementTemperatureMax = document.createElement("p");
    pElementTemperatureMax.textContent = "Max: " + weatherData.daily.temperature_2m_max[0] + weatherData.daily_units.temperature_2m_max;
    containerElementCurrentWeatherInfo.appendChild(pElementTemperatureMax);

    const pElementTemperatureMin = document.createElement("p");
    pElementTemperatureMin.textContent = "Min: " + weatherData.daily.temperature_2m_min[0] + weatherData.daily_units.temperature_2m_min;
    containerElementCurrentWeatherInfo.appendChild(pElementTemperatureMin);

    flexElementCurrentWeather.appendChild(containerElementCurrentWeatherInfo);
    currentForecastFrontElement.appendChild(flexElementCurrentWeather);

    currentForecastElement.appendChild(currentForecastFrontElement);

    //CREATE BACKSIDE CURRENT WEATHER
    const currentForecastBackElement = document.createElement("section");
    currentForecastBackElement.classList.add("weather-section-current-back", "hidden");

    const h2ElementBack = document.createElement("h2");
    h2ElementBack.textContent = "Today";
    currentForecastBackElement.appendChild(h2ElementBack);

    const flexElement = createHourlyForecast(hour, 0, weatherData);
    currentForecastBackElement.appendChild(flexElement);

    currentForecastElement.appendChild(currentForecastBackElement);
    
    //CREATE 7 day forecast
    for (let index = 1; index < 7; index++) {
        const day = new Date(weatherData.daily.time[index]).getDay();
        const time = weatherData.daily.time[index].split("-");
        const weatherCode = weatherDescriptions[weatherData.daily.weather_code[index]];

        const weatherElement = document.createElement("section");
        weatherElement.classList.add("weather-section");

        //CREATE FRONTSIDE   
        const sectionElement = document.createElement("section");
        sectionElement.classList.add("weather-section-content");

        const h2Element = document.createElement("h2");
        h2Element.textContent = days[day] + " " + time[2] + " " + months[time[1]-1];
        sectionElement.appendChild(h2Element);

        const div = document.createElement("div");
        div.classList.add("flex");

        const divDay = document.createElement("div");

        const pElementDay = document.createElement("p");
        pElementDay.textContent = weatherCode.day.description;
        divDay.appendChild(pElementDay);

        const imgElementDay = document.createElement("img");
        imgElementDay.src = weatherCode.day.image;
        imgElementDay.alt = "weather day " + time[2] + " " + months[time[1]-1];
        divDay.appendChild(imgElementDay);

        div.appendChild(divDay);
        sectionElement.appendChild(div);

        const pElementTemperature = document.createElement("p");
        pElementTemperature.textContent = "Max: " + weatherData.daily.temperature_2m_max[index] + weatherData.daily_units.temperature_2m_max +
                                            " - Min: " + weatherData.daily.temperature_2m_min[index] + weatherData.daily_units.temperature_2m_min;
        sectionElement.appendChild(pElementTemperature);
        weatherElement.appendChild(sectionElement);

        //ADD TO MAIN SECTION
        forecastElement.appendChild(weatherElement);
    }
}

function createHourlyForecast(startIndex, day, weatherData) {
    const forecastElement = document.createElement("section");
    forecastElement.setAttribute("tabindex", "0");
    forecastElement.classList.add("overflow");
    for (let index = startIndex + (24 * day); index < (24 * (day + 1)) + startIndex; index++) {
        const hourlyCard = document.createElement("div");
        hourlyCard.classList.add("hourly-section")

        const hourElement = document.createElement("p");
        hourElement.textContent = weatherData.hourly.time[index].split("T")[1];
        hourlyCard.appendChild(hourElement);

        const hourlyImage = document.createElement("img");
        if (weatherData.hourly.is_day[index]) hourlyImage.src = weatherDescriptions[weatherData.hourly.weather_code[index]].day.image;
        else hourlyImage.src = weatherDescriptions[weatherData.hourly.weather_code[index]].night.image;
        hourlyImage.classList.add("small");
        hourlyImage.alt = "weather image " + weatherData.hourly.time[index].split("T")[1];
        hourlyCard.appendChild(hourlyImage);

        const hourlyTemp = document.createElement("p");
        hourlyTemp.textContent = weatherData.hourly.temperature_2m[index] + weatherData.hourly_units.temperature_2m;
        hourlyCard.appendChild(hourlyTemp);

        const hourlyRain = document.createElement("p");
        hourlyRain.textContent = weatherData.hourly.precipitation[index] + " " + weatherData.hourly_units.precipitation;
        hourlyCard.appendChild(hourlyRain);

        const hourlyPercentage = document.createElement("p");
        hourlyPercentage.textContent = weatherData.hourly.precipitation_probability[index] + weatherData.hourly_units.precipitation_probability;
        hourlyCard.appendChild(hourlyPercentage);

        forecastElement.appendChild(hourlyCard);
    }
    return forecastElement;
}

function showHourlyForecast(event) {
    const frontSection = document.querySelector(".weather-section-current-front");
    const backSection = document.querySelector(".weather-section-current-back");
    
    if (frontSection.classList.contains("hidden")) {
        frontSection.classList.remove("hidden");
        backSection.classList.add("hidden");
    } else {
        frontSection.classList.add("hidden");
        backSection.classList.remove("hidden");
    }
}