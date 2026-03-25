const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Peru",
    location: "Lima, Peru",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Gilbert Arizona",
    location: "Gilbert, Arizona, United States",
    dedicated: "2014, March, 2",
    area: 85000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/gilbert-arizona/400x250/gilbert-arizona-temple-1038444-wallpaper.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42100,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-hawaii-temple-761091-wallpaper.jpg"
  }
];

const templeContainer = document.getElementById("temple-cards");
const pageTitle = document.getElementById("page-title");
const nav = document.getElementById("main-nav");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".main-nav a");

const filterConfig = {
  home: {
    label: "Home",
    predicate: () => true
  },
  old: {
    label: "Old",
    predicate: (temple) => getTempleYear(temple) < 1900
  },
  new: {
    label: "New",
    predicate: (temple) => getTempleYear(temple) > 2000
  },
  large: {
    label: "Large",
    predicate: (temple) => temple.area > 90000
  },
  small: {
    label: "Small",
    predicate: (temple) => temple.area < 10000
  }
};

function getTempleYear(temple) {
  return Number.parseInt(temple.dedicated.split(",")[0], 10);
}

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "temple-card";

  const image = document.createElement("img");
  image.src = temple.imageUrl;
  image.alt = `${temple.templeName} Temple`;
  image.loading = "lazy";
  image.width = 400;
  image.height = 250;

  const content = document.createElement("div");
  content.className = "temple-card-content";

  const name = document.createElement("h3");
  name.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<strong>Size:</strong> ${temple.area.toLocaleString()} square feet`;

  content.append(name, location, dedicated, area);
  card.append(image, content);

  return card;
}

function displayTemples(filteredTemples) {
  templeContainer.innerHTML = "";

  if (!filteredTemples.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No temples matched that filter.";
    templeContainer.append(emptyState);
    return;
  }

  filteredTemples.forEach((temple) => {
    templeContainer.append(createTempleCard(temple));
  });
}

function setActiveLink(filterName) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.filter === filterName;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function applyFilter(filterName) {
  const selectedFilter = filterConfig[filterName] || filterConfig.home;
  const filteredTemples = temples.filter(selectedFilter.predicate);

  pageTitle.textContent = selectedFilter.label;
  displayTemples(filteredTemples);
  setActiveLink(filterName);
}

function toggleMenu() {
  const isOpen = nav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.textContent = isOpen ? "Close" : "Menu";
}

function closeMenuOnSelection() {
  if (window.innerWidth < 800) {
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.textContent = "Menu";
  }
}

document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

hamburger.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    applyFilter(link.dataset.filter);
    closeMenuOnSelection();
  });
});

applyFilter("home");
