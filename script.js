addListeners()

function addListeners() {
    const weatherButton = document.querySelector("#get-weather-button");
    weatherButton.addEventListener("click", searchWeatherForecast)
}

function searchWeatherForecast() {
    const cityInput = document.querySelector("#cities-input")
    const city = cityInput.value;

    fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city)
        .then(response => response.json())
        .then(data => {
            console.log(data.results[0]);
            getWeatherForecast(data.results[0].latitude, data.results[0].longitude)
        })
        .catch(error => {
            console.log(error);
        })
}

function getWeatherForecast(lat, long) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long +"&current=rain&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max")
        .then(response => response.json())
        .then(weather => {
            console.log(weather);
        })
        .catch(error => {
            console.log(error);
        })
}