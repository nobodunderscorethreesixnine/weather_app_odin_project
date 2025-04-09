import "./weather_app.css";

const API = "YF8F47NWB2G6N9ZDFGHKHM9WT";
// querying html
const srchBtn = document.querySelector("#srch");
const errorField = document.querySelector(".error");
const inputField = document.querySelector("#input");
const locationName = document.querySelector(".location");
const continentName = document.querySelector(".continent");
const weatherType = document.querySelector(".weather-type");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".description");
const weatherConditionImg = document.querySelector(".weather-condition-icon");
const humidity = document.querySelector(".humidity>strong");
const visibility = document.querySelector(".visibility>strong");
const uvIndex = document.querySelector(".uv-index>strong");
const weatherInfo = document.querySelector(".weather-info");
const converterBtn = document.querySelector(".converter");

inputField.addEventListener("keyup", (e) => {
	if (e.key === "Enter" && inputField.value.length !== 0) {
		getWeather(inputField.value);
	}
});

srchBtn.addEventListener("click", (e) => {
	if (inputField.value.length !== 0) {
		getWeather(inputField.value);
	}
});

async function getWeather(location) {
	try {
		const weather = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API}`,
			{ mode: "cors" }
		);
		if (!weather.ok) {
			throw new Error("Invalid Location Name");
		}
		resetValue();
		weatherInfo.style.display = "grid";
		const data = await weather.json();
		displayWeatherDOM(data);
	} catch (error) {
		handleError(error);
	}
}

getWeather("nepal");

function displayWeatherDOM(weatherInfo) {
	const address =
		weatherInfo.address.charAt(0).toUpperCase() +
		weatherInfo.address.slice(1); /* capitalized 1st letter of word */
	locationName.textContent = address;
	continentName.textContent = weatherInfo.timezone;
	weatherType.textContent = weatherInfo.currentConditions.conditions;
	temp.textContent = weatherInfo.currentConditions.temp + "°c";
	desc.textContent = weatherInfo.description;
	displayImg(weatherInfo.currentConditions.icon);
	humidity.textContent = (weatherInfo.currentConditions.humidity ?? 0) + '%'
	visibility.textContent = (weatherInfo.currentConditions.visibility ?? 0) + '%'
	uvIndex.textContent = (weatherInfo.currentConditions.uvindex ?? 0) + '%'
}

function handleError(errorMsg) {
	weatherInfo.style.display = "none";
	errorField.textContent = errorMsg.message;
	converterBtn.disabled = true;
}

// dynamic import
async function displayImg(imgName) {
	const { default: imgSrc } = await import(
		`../images/${imgName}.png`
	); /* destructuring, to get path to file directly instead of using imgSrc.default */
	weatherConditionImg.src = imgSrc;
}

function resetValue() {
	converterBtn.disabled = false;
	errorField.textContent = "";
	converterBtn.textContent = "C";
}

converterBtn.addEventListener("click", () => {
	const tempValue = parseInt(temp.textContent);

	if (converterBtn.textContent === "C") {
		temp.textContent = celsiusToFahrenheit(tempValue);
		converterBtn.textContent = "F";
	} else if (converterBtn.textContent === "F") {
		temp.textContent = fahrenheitToCelsius(tempValue);
		converterBtn.textContent = "C";
	}
});

function celsiusToFahrenheit(celsius) {
	return Math.round(celsius * (9 / 5) + 32) + "°f";
}

function fahrenheitToCelsius(fahrenheit) {
	return Math.round((fahrenheit - 32) * (5 / 9)) + "°c";
}
