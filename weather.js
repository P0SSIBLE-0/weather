
async function getWeather(lat, long, timezone) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=28.65&longitude=77.23&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,surface_pressure,visibility,windspeed_10m&current_weather=true&precipitation_unit=inch&timeformat=unixtime`
    await fetch(url).then((res) => res.json())
        .then(data => updateWeather(data))
        .catch(err => console.log(err));
}
let timeStamp = Intl.DateTimeFormat().resolvedOptions().timeZone
console.log(timeStamp)
getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)

let current_temp = document.querySelector('.temp');
let today_date = document.querySelector('.date');
let apparent_temperature = document.querySelector('[data-app-temp]');
let humidity = document.querySelector('[data-humidity]');
let wind = document.querySelector('[data-wind]');
let airPressure = document.querySelector('[data-air-pressure]');
let visibility = document.querySelector('[data-visibility]');
let weatherIcon = document.querySelector('#icon');

const updateWeather = (data) => {
    current_temp.innerHTML = Math.round(data.current_weather.temperature) + '&deg;C'
    let unix_time = data.current_weather.time
    let date = new Date(unix_time * 1000)
    today_date.innerHTML = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'short' })
    apparent_temperature.textContent = `${data.hourly.apparent_temperature[data.hourly.apparent_temperature.length - 1]}°C`
    humidity.textContent = data.hourly.relativehumidity_2m[data.hourly.relativehumidity_2m.length - 1] + '%'
    wind.textContent = data.current_weather.windspeed + ' Km/h'
    airPressure.textContent = Math.round(data.hourly.surface_pressure[data.hourly.surface_pressure.length - 1]) + 'hPa'
    visibility.textContent = Math.floor((data.hourly.visibility[data.hourly.visibility.length - 1]) / 3280) + ' Km/h'
    var weathercode = data.current_weather.weathercode
    changeIcon(weathercode)
}
if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(showPosition);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
        "\nLongitude: " + position.coords.longitude);
}

const changeIcon = (weathercode) => {
    if (weathercode === 0) {
        weatherIcon.src = 'sun.png'
    } else if (weathercode <= 3) {
        weatherIcon.src = 'cloudy.png'

    } else if (weathercode === 61 || weathercode === 63 || weathercode === 65 || weathercode === 66 || 67) {
        weatherIcon.src = 'cloudy (1).png'
    } else if (weathercode === 71 || weathercode === 73 || weathercode === 75) {

    } else if (weathercode > 80) {
        weatherIcon.src = 'rain.png'
    } else {
        weatherIcon.src = 'storm.png'
    }
}
window.addEventListener('load', () => {
    document.querySelector('.container').classList.remove("blur");
})
