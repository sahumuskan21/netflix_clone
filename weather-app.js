const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('search-btn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('Humidity');
const windSpeed = document.getElementById('Wind-Speed');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = "091c5843ef38545448b29a49de56d364";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === "404") {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            console.error("Location not found");
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.innerHTML = weatherData.weather[0].description;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/H`;

        switch (weatherData.weather[0].main.toLowerCase()) {
            case 'clouds':
                weatherImg.src = "1img.jpeg";
                break;
            case 'clear':
                weatherImg.src = "clear.jpeg";
                break;
            case 'rain':
                weatherImg.src = "cc.jpeg";
                break;
            case 'mist':
                weatherImg.src = "mist.jpeg";
                break;
            case 'snow':
                weatherImg.src = "snow.jpeg";
                break;
            default:
                weatherImg.src = "default.jpeg"; // Default image for undefined weather conditions
        }

        console.log(weatherData);

    } catch (error) {
        console.error("Error fetching weather data: ", error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
