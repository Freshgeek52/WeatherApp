const apiKey = '7f277e9a9773f725e88fcf065beb8857'; // Replace with your actual API key
const form = document.getElementById('weather-form');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const location = locationInput.value.trim();
    if (!location) return;

    weatherInfo.innerHTML = 'Loading...';

    try {
        const weatherData = await getWeatherData(location);
        displayWeather(weatherData);
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching weather data.';
    }
});

async function getWeatherData(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const feelsLike = data.main.feels_like;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const pressure = data.main.pressure;

    const celsius = temperature - 273.15;
    const fahrenheit = (celsius * 9/5) + 32;

    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Description: ${description}</p>
        <p>Temperature: ${celsius.toFixed(2)}°C / ${fahrenheit.toFixed(2)}°F</p>
        <p>Feels Like: ${feelsLike.toFixed(2)}°C</p>
        <p>Min Temperature: ${tempMin.toFixed(2)}°C</p>
        <p>Max Temperature: ${tempMax.toFixed(2)}°C</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>
    `;
    
        // Change background color based on weather description
        const body = document.body;
        if (description.includes('cloud')) {
            body.style.backgroundColor = '#c4d8e2'; // Light blue
        } else if (description.includes('rain')) {
            body.style.backgroundColor = '#b2c9d9'; // Grayish blue
        } else if (description.includes('clear')) {
            body.style.backgroundColor = '#f3d5b2'; // Light orange
        } else {
            body.style.backgroundColor = '#f2f2f2'; // Default background color
        }
    
        // Display weather-related images
        let imageSrc = '';
        if (description.includes('cloud')) {
            imageSrc = 'images/cloudy.png';
        } else if (description.includes('rain')) {
            imageSrc = 'images/rainy.png';
        } else if (description.includes('clear')) {
            imageSrc = 'images/sunny.png';
        } else {
            imageSrc = 'images/default.png';
        }
    
        const weatherImage = document.createElement('img');
        weatherImage.src = imageSrc;
        weatherImage.alt = 'Weather Image';
        weatherInfo.appendChild(weatherImage);
    }

