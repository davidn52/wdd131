// Place JavaScript

// Wind chill calculation
function calculateWindChill(temp, wind) {
    if (temp <= 10 && wind > 4.8) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1) + "°C";
    } else {
        return "N/A";
    }
}

// Static values
const temperature = 15; // °C
const windSpeed = 10; // km/h

// Display wind chill
document.getElementById("wind-chill").textContent = calculateWindChill(temperature, windSpeed);

// Footer
const year = new Date().getFullYear();
document.getElementById("current-year").textContent = year;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;