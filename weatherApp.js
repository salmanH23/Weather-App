const API_KEY = `3276ec0d04fdcce382ad715df82e6402`;
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

// Function to fetch weather data
const getWeather = async (city) => {
    weather.innerHTML = `<h2>Loading...</h2>`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Handle invalid city error
        if (data.cod === "404") {
            weather.innerHTML = `<h2>City Not Found</h2>`;
            return;
        }

        // Display the weather information
        showWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weather.innerHTML = `<h2>Error fetching weather data. Please try again later.</h2>`;
    }
};

// Function to display weather data
const showWeather = (data) => {
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
};

// Add event listener for form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const city = search.value.trim(); 
    if (city === "") {
        weather.innerHTML = `<h2>Please enter a city name</h2>`;
        return;
    }
    getWeather(city); 
});
