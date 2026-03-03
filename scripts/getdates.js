// Get current year
const year = new Date().getFullYear();

//insert year in to span
document.getElementById("current-year").textContent = year;

// Get last modified date
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;