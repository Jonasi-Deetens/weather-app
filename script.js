import { weatherDescriptions } from "./weatherDescriptions.js";
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
    const weatherButton = document.querySelector("#get-weather-button");
    weatherButton.addEventListener("click", fetchData);
}

async function getGeoData() {
    const cityInput = document.querySelector("#cities-input")
    const city = cityInput.value;

    const response = await fetch(geoAPI + city);
    const data = await response.json();
    return data.results[0];
}

async function getWeatherData() {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + geoData.latitude + "&longitude=" + geoData.longitude +"&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,cloud_cover,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max");
    const data = await response.json();
    return data;
}

async function generateWeatherForecast() {
    const d = new Date();
    let hour = d.getHours();
    const currentTime = weatherData.daily.time[0].split("-");

    const forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = "";

    const weatherSearchElement = document.querySelector("#main-content");
    weatherSearchElement.style.height = "200px";
    console.log(weatherData);
    
    const currentForecastElement = document.querySelector("#forecast-today");
    currentForecastElement.innerHTML = "";
    currentForecastElement.addEventListener("click", showHourlyForecast);
    const currentWeather = weatherDescriptions[weatherData.daily.weather_code[0]];

    //CREATE FRONTSIDE CURRENT WEATHER
    const currentForecastFrontElement = document.createElement("section");
    currentForecastFrontElement.classList.add("weather-section-front");

    const h1Element = document.createElement("h1");
    h1Element.textContent = geoData.name;
    currentForecastFrontElement.appendChild(h1Element);

    const h2ElementDay = document.createElement("h2");
    h2ElementDay.textContent = "Today";
    currentForecastFrontElement.appendChild(h2ElementDay);

    const imgElement = document.createElement("img");
    if (weatherData.current.is_day) imgElement.src = currentWeather.day.image;
    else imgElement.src = currentWeather.night.image;
    imgElement.alt = "current weather image";
    currentForecastFrontElement.appendChild(imgElement);

    const h2Element = document.createElement("h2");
    h2Element.textContent = weatherData.current.temperature_2m + weatherData.current_units.temperature_2m;
    currentForecastFrontElement.appendChild(h2Element);

    const pElementTemperature = document.createElement("p");
    pElementTemperature.textContent = "H: " + weatherData.daily.temperature_2m_max[0] + weatherData.daily_units.temperature_2m_max +
                                            " - L: " + weatherData.daily.temperature_2m_min[0] + weatherData.daily_units.temperature_2m_min;
    currentForecastFrontElement.appendChild(pElementTemperature);

    currentForecastElement.appendChild(currentForecastFrontElement);

    //CREATE BACKSIDE CURRENT WEATHER
    const currentForecastBackElement = document.createElement("section");
    currentForecastBackElement.classList.add("weather-section-back", "hidden");

    const h2ElementBack = document.createElement("h2");
    h2ElementBack.textContent = currentTime[2] + " " + months[currentTime[1]-1];
    currentForecastBackElement.appendChild(h2ElementBack);

    const flexElement = createHourlyForecast(hour, 0, weatherData);
    currentForecastBackElement.appendChild(flexElement);

    currentForecastElement.appendChild(currentForecastBackElement);
    
    //CREATE 7 day forecast
    for (let index = 1; index < 7; index++) {
        const time = weatherData.daily.time[index].split("-");
        const weatherCode = weatherDescriptions[weatherData.daily.weather_code[index]];

        const weatherElement = document.createElement("section");
        weatherElement.classList.add("weather-section");
        weatherElement.addEventListener("click", showHourlyForecast);

        //CREATE FRONTSIDE   
        const sectionElement = document.createElement("section");
        sectionElement.classList.add("weather-section-front");

        const h2Element = document.createElement("h2");
        h2Element.textContent = time[2] + " " + months[time[1]-1];
        sectionElement.appendChild(h2Element);

        const div = document.createElement("div");
        div.classList.add("flex");

        const divDay = document.createElement("div");

        const h3ElementDay = document.createElement("h3");
        h3ElementDay.textContent = "Day";
        divDay.appendChild(h3ElementDay);

        const pElementDay = document.createElement("p");
        pElementDay.textContent = weatherCode.day.description;
        divDay.appendChild(pElementDay);

        const imgElementDay = document.createElement("img");
        imgElementDay.src = weatherCode.day.image;
        imgElementDay.alt = "weather day " + time[2] + " " + months[time[1]-1];
        divDay.appendChild(imgElementDay);

        div.appendChild(divDay);
        const divNight = document.createElement("div");

        const h3ElementNight = document.createElement("h3");
        h3ElementNight.textContent = "Night";
        divNight.appendChild(h3ElementNight);

        const pElementNight = document.createElement("p");
        pElementNight.textContent = weatherCode.night.description;
        divNight.appendChild(pElementNight);

        const imgElementNight = document.createElement("img");
        imgElementNight.src = weatherCode.night.image;
        imgElementNight.alt = "weather night " + time[2] + " " + months[time[1]-1]
        divNight.appendChild(imgElementNight);

        div.appendChild(divNight);
        sectionElement.appendChild(div);

        const pElementTemperature = document.createElement("p");
        pElementTemperature.textContent = "H: " + weatherData.daily.temperature_2m_max[index] + weatherData.daily_units.temperature_2m_max +
                                            " - L: " + weatherData.daily.temperature_2m_min[index] + weatherData.daily_units.temperature_2m_min;
        sectionElement.appendChild(pElementTemperature);
        weatherElement.appendChild(sectionElement);


        //CREATE BACKSIDE
        const sectionElementBack = document.createElement("section");
        sectionElementBack.classList.add("weather-section-back", "hidden");

        const h2ElementBack = document.createElement("h2");
        h2ElementBack.textContent = time[2] + " " + months[time[1]-1];
        sectionElementBack.appendChild(h2ElementBack);

        const flexElementBack = createHourlyForecast(0, index, weatherData);
        sectionElementBack.appendChild(flexElementBack);

        weatherElement.appendChild(sectionElementBack);

        //ADD TO MAIN SECTION
        forecastElement.appendChild(weatherElement);
    }
}

function createHourlyForecast(startIndex, day, weatherData) {
    const forecastElement = document.createElement("div");
    forecastElement.style.display = "flex";
    forecastElement.classList.add("overflow");
    for (let index = startIndex + (24 * day); index < 24 * (day + 1); index++) {
        const hourlyCard = document.createElement("div");
        hourlyCard.classList.add("hourly-section")

        const hourElement = document.createElement("p");
        hourElement.textContent = weatherData.hourly.time[index].split("T")[1];
        hourlyCard.appendChild(hourElement);

        const hourlyImage = document.createElement("img");
        if (weatherData.current.is_day) hourlyImage.src = weatherDescriptions[weatherData.hourly.weather_code[index]].day.image;
        else hourlyImage.src = weatherDescriptions[weatherData.hourly.weather_code[index]].night.image;
        hourlyImage.classList.add("small");
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
    const frontSections = document.querySelectorAll(".weather-section-front");
    const backSections = document.querySelectorAll(".weather-section-back");
    const target = event.target;
    console.log(target.parentElement);
    
    if (target.classList.contains("weather-section-front") || target.parentElement.classList.contains("weather-section-front")) {
        frontSections.forEach((element, index) => {
            if (element === target || element === target.parentElement) {
                if (element.classList.contains("hidden")) {
                    element.classList.remove("hidden")
                    backSections[index].classList.add("hidden");
                } else {
                    element.classList.add("hidden");
                    backSections[index].classList.remove("hidden");
                }
            }
        });
    } else if (target.classList.contains("weather-section-back") || target.parentElement.classList.contains("weather-section-back")) {
        console.log("back");
        backSections.forEach((element, index) => {
            if (element === target || element === target.parentElement) {
                if (element.classList.contains("hidden")) {
                    element.classList.remove("hidden")
                    frontSections[index].classList.add("hidden");
                } else {
                    element.classList.add("hidden");
                    frontSections[index].classList.remove("hidden");
                }
            }
        });
    }
}