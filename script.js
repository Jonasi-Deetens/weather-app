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
    //fetchData();
}

function addListeners() {
    const form = document.querySelector("#search-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        fetchData();
    });

    const hourlyButton = document.querySelector(".hourly");
    hourlyButton.addEventListener("click", showHourlyForecast);

    const openWindowButton = document.querySelector(".open");
    openWindowButton.addEventListener("click", openWindows);
}

async function getGeoData() {
    const cityInput = document.querySelector("#cities-input");
    let city = cityInput.value;
    //if (city === "") city = "gent";

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
    console.log(weatherData);
    const d = new Date();
    let hour = d.getHours();

    const forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = "";

    const weatherSearchElement = document.querySelector("#main-content");
    weatherSearchElement.style.height = "200px";
    weatherSearchElement.style.margin = "0";
    weatherSearchElement.style.borderBottom = "3px solid black";
    document.querySelector(".weather-section-current-front").children[0].prepend(weatherSearchElement);

    const windowElement = document.querySelector(".window");
    windowElement.classList.remove("hidden");
    
    const currentForecastElement = document.querySelector("#forecast-today");
    currentForecastElement.classList.remove("hidden");
    const currentWeather = weatherDescriptions[weatherData.daily.weather_code[0]];

    if (weatherData.current.is_day) document.body.style.backgroundImage = "url(" + weatherDescriptions[weatherData.daily.weather_code[0]].day.background + ")";
    else document.body.style.backgroundImage = "url(" +  weatherDescriptions[weatherData.daily.weather_code[0]].night.background + ")";

    //CREATE TITEL SECTION
    const cityTitelElement = document.querySelector(".weather-title");
    cityTitelElement.textContent = geoData.name;
    cityTitelElement.classList.add("dark-title");

    //CREATE FRONTSIDE CURRENT WEATHER
    const h3ElementDescription = document.querySelector("#current-weather-description")
    if (weatherData.current.is_day) h3ElementDescription.textContent = currentWeather.day.description;
    else h3ElementDescription.textContent = currentWeather.night.description;

    const imgElement = document.createElement("img");
    if (weatherData.current.is_day) imgElement.src = currentWeather.day.image;
    else imgElement.src = currentWeather.night.image;
    imgElement.alt = "current weather image";
    const figureElement = document.querySelector("#current-weather-image");
    figureElement.innerHTML = "";
    figureElement.appendChild(imgElement);

    const windowTempElement = document.querySelector(".window-title");
    windowTempElement.textContent = weatherData.current.temperature_2m + weatherData.current_units.temperature_2m;
    const currentTempElement = document.querySelector("#current-temp");
    currentTempElement.textContent = weatherData.current.temperature_2m + weatherData.current_units.temperature_2m;

    const feelsTempElement = document.querySelector("#feels-temp");
    feelsTempElement.textContent = "Feel: " + weatherData.hourly.apparent_temperature[hour] + weatherData.daily_units.temperature_2m_min;

    const maxTempElement = document.querySelector("#max-temp");
    maxTempElement.textContent = "Max: " + weatherData.daily.temperature_2m_max[0] + weatherData.daily_units.temperature_2m_max;

    const minTempElement = document.querySelector("#min-temp");
    minTempElement.textContent = "Min: " + weatherData.daily.temperature_2m_min[0] + weatherData.daily_units.temperature_2m_min;

    //CREATE BACKSIDE CURRENT WEATHER
    const windowGlassElement = document.querySelector(".window-right");
    const currentForecastBackElement = document.createElement("div");
    currentForecastBackElement.classList.add("weather-section-current-back", "hidden");

    const h2ElementBack = document.createElement("h2");
    h2ElementBack.textContent = "Hourly forecast";
    currentForecastBackElement.appendChild(h2ElementBack);

    const flexElement = createHourlyForecast(hour, 0, weatherData);
    currentForecastBackElement.appendChild(flexElement);

    windowGlassElement.appendChild(currentForecastBackElement);
    
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

        const div = document.createElement("div");
        div.classList.add("flex-col");

        const h2Element = document.createElement("h2");
        h2Element.textContent = days[day] + " " + time[2] + " " + months[time[1]-1];
        div.appendChild(h2Element);

        const pElementDay = document.createElement("p");
        pElementDay.textContent = weatherCode.day.description;
        div.appendChild(pElementDay);

        const imgElementDay = document.createElement("img");
        imgElementDay.src = weatherCode.day.image;
        imgElementDay.alt = "weather day " + time[2] + " " + months[time[1]-1];
        div.appendChild(imgElementDay);

        const pElementTemperature = document.createElement("p");
        pElementTemperature.textContent = "Max: " + weatherData.daily.temperature_2m_max[index] + weatherData.daily_units.temperature_2m_max +
                                            " - Min: " + weatherData.daily.temperature_2m_min[index] + weatherData.daily_units.temperature_2m_min;
        div.appendChild(pElementTemperature);

        sectionElement.appendChild(div);

        weatherElement.appendChild(sectionElement);

        //ADD TO MAIN SECTION
        forecastElement.appendChild(weatherElement);
    }
}

function createHourlyForecast(startIndex, day, weatherData) {
    const forecastElement = document.createElement("section");
    forecastElement.setAttribute("tabindex", "0");
    forecastElement.classList.add("flex");
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

function openWindows(event) {
    const button = event.target;
    if (button.textContent === "Open windows") button.textContent = "Close windows";
    else button.textContent = "Open windows";

    const windowLeft = document.querySelector(".window-left");  
    const windowRight = document.querySelector(".window-right");

    if (windowLeft.style.left === "") {
        windowLeft.style.left = "-999px";
        windowRight.style.right = "-999px";
    } else {
        windowLeft.style.left = "";
        windowRight.style.right = "";
    }
}

function showHourlyForecast(event) {
    const button = event.target;
    const backSection = document.querySelector(".weather-section-current-back");
    
    if (backSection.classList.contains("hidden")) {
        backSection.classList.remove("hidden");
        button.textContent = "Hide hourly";
    } else {
        backSection.classList.add("hidden");
        button.textContent = "Show hourly";
    }
}