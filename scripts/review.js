const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

const params = new URLSearchParams(window.location.search);
const productLookup = new Map(products.map((product) => [product.id, product.name]));

const setText = (id, value) => {
    const element = document.querySelector(id);
    if (element) {
        element.textContent = value;
    }
};

const productId = params.get("product");
const rating = params.get("rating");
const installDate = params.get("installDate");
const features = params.getAll("features");
const review = params.get("review");
const userName = params.get("userName");

setText("#summaryProduct", productLookup.get(productId) || "Not provided");
setText("#summaryRating", rating ? `${rating} star${rating === "1" ? "" : "s"}` : "Not provided");
setText("#summaryInstallDate", installDate || "Not provided");
setText("#summaryFeatures", features.length ? features.join(", ") : "None selected");
setText("#summaryReview", review ? review : "No written review provided");
setText("#summaryUserName", userName ? userName : "Anonymous");

const storageKey = "wdd131-review-count";
const pendingReview = sessionStorage.getItem("wdd131-pending-review") === "true";
let reviewCount = Number(localStorage.getItem(storageKey)) || 0;

if (pendingReview) {
    reviewCount += 1;
    localStorage.setItem(storageKey, reviewCount);
    sessionStorage.removeItem("wdd131-pending-review");
}

setText("#reviewCount", String(reviewCount));
