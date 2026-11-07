 
// Destination Sample Data
const destinations = [
    {
        name: "Bali",
        country: "Indonesia",
        category: "Beach",
        price: "₹25,000",
        rating: "4.9",
        description: "Enjoy beautiful beaches, temples and tropical views.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"
    },
    {
        name: "Paris",
        country: "France",
        category: "City",
        price: "₹65,000",
        rating: "4.8",
        description: "Experience the Eiffel Tower and romantic city streets.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
    },
    {
        name: "Switzerland",
        country: "Europe",
        category: "Mountain",
        price: "₹85,000",
        rating: "5.0",
        description: "Explore snowy mountains and beautiful landscapes.",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800"
    },
    {
        name: "Goa",
        country: "India",
        category: "Beach",
        price: "₹12,000",
        rating: "4.7",
        description: "Relax on sunny beaches and enjoy coastal beauty.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
    },
    {
        name: "Manali",
        country: "India",
        category: "Mountain",
        price: "₹15,000",
        rating: "4.8",
        description: "Discover peaceful valleys and mountain adventures.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
    },
    {
        name: "Dubai",
        country: "UAE",
        category: "City",
        price: "₹45,000",
        rating: "4.9",
        description: "Explore modern buildings and desert attractions.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
    },
    {
        name: "Maldives",
        country: "Indian Ocean",
        category: "Beach",
        price: "₹55,000",
        rating: "5.0",
        description: "Enjoy clear blue water and beautiful island views.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800"
    },
    {
        name: "Shimla",
        country: "India",
        category: "Mountain",
        price: "₹13,000",
        rating: "4.6",
        description: "Enjoy hill stations, fresh air and scenic views.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
    },
    {
        name: "London",
        country: "United Kingdom",
        category: "City",
        price: "₹75,000",
        rating: "4.8",
        description: "Discover famous landmarks and historic attractions.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800"
    }
];

// Get HTML Elements
const destinationGrid = document.getElementById("destinationGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");

// Current category
let selectedCategory = "All";

// Display Destination Cards
function displayDestinations(list) {

    destinationGrid.innerHTML = "";

    if (list.length === 0) {
        noResults.hidden = false;
        return;
    }

    noResults.hidden = true;

    list.forEach(function(destination) {

        const card = document.createElement("div");
        card.className = "destination-card";

        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.name;
        image.loading = "lazy";

        image.onerror = function() {
            image.src = "https://placehold.co/600x400?text=Travel+Destination";
        };

        const info = document.createElement("div");
        info.className = "destination-info";

        const category = document.createElement("span");
        category.className = "destination-category";
        category.textContent = destination.category;

        const title = document.createElement("h3");
        title.textContent = destination.name + ", " + destination.country;

        const description = document.createElement("p");
        description.textContent = destination.description;

        const bottom = document.createElement("div");
        bottom.className = "destination-bottom";

        const price = document.createElement("span");
        price.className = "destination-price";
        price.textContent = "From " + destination.price;

        const rating = document.createElement("span");
        rating.className = "destination-rating";
        rating.textContent = "★ " + destination.rating;

        bottom.appendChild(price);
        bottom.appendChild(rating);

        info.appendChild(category);
        info.appendChild(title);
        info.appendChild(description);
        info.appendChild(bottom);

        card.appendChild(image);
        card.appendChild(info);

        destinationGrid.appendChild(card);
    });
}

// Search and Filter Destinations
function filterDestinations() {

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredList = destinations.filter(function(destination) {

        const matchesSearch =
            destination.name.toLowerCase().includes(searchText) ||
            destination.country.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            destination.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayDestinations(filteredList);
}

// Search Button
searchBtn.addEventListener("click", function() {
    filterDestinations();
});

// Search while typing
searchInput.addEventListener("input", function() {
    filterDestinations();
});

// Category Filter Buttons
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterDestinations();
    });
});

// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });

});

// Package Booking Buttons
const packageButtons = document.querySelectorAll(".book-btn");

packageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const packageName = button.dataset.package;

        const bookingSection = document.getElementById("contact");
        const destinationSelect =
            document.getElementById("selectedDestination");

        bookingSection.scrollIntoView({
            behavior: "smooth"
        });

        // Add the package name to the destination field
        const packageOptions = {
            "Goa Holiday": "Goa",
            "Agra Tour": "Agra",
            "Mountain Escape": "Manali"
        };

        destinationSelect.value = packageOptions[packageName] || "";

        document.getElementById("formMessage").textContent =
            "You selected: " + packageName;
    });

});

// Booking Form
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const destination =
        document.getElementById("selectedDestination").value;
    const date = document.getElementById("travelDate").value;

    if (!name || !email || !destination || !date) {

        formMessage.textContent = "Please fill in all the details.";
        return;
    }

    const selectedDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        formMessage.textContent = "Please select a future travel date.";
        return;
    }

    formMessage.textContent =
        "Thank you, " + name + "! Your enquiry for " +
        destination + " has been submitted successfully.";

    bookingForm.reset();
});

// Display All Destinations When Website Loads
displayDestinations(destinations);
