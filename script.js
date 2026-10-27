let favorites = [];
let myListings = [];


/* ================= PAGE CONTROL ================= */

function hideAllPages() {

    document.getElementById("homePage").style.display = "none";
    document.getElementById("sellPage").style.display = "none";
    document.getElementById("favoritesPage").style.display = "none";
    document.getElementById("listingsPage").style.display = "none";

}


function showHome() {

    hideAllPages();

    document.getElementById("homePage").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showSellPage() {

    hideAllPages();

    document.getElementById("sellPage").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showFavorites() {

    hideAllPages();

    document.getElementById("favoritesPage").style.display = "block";

    displayFavorites();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showMyListings() {

    hideAllPages();

    document.getElementById("listingsPage").style.display = "block";

    displayListings();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function scrollToBrowse() {

    hideAllPages();

    document.getElementById("homePage").style.display = "block";

    setTimeout(function () {

        document.getElementById("browseSection").scrollIntoView({
            behavior: "smooth"
        });

    }, 100);

}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const navigation = document.querySelector(".navigation");

    navigation.classList.toggle("show");

}


/* ================= CATEGORY FILTER ================= */

function filterCategory(category, button) {

    const products = document.querySelectorAll(".product-card");
    const buttons = document.querySelectorAll(".category");

    buttons.forEach(function (item) {
        item.classList.remove("active");
    });

    button.classList.add("active");

    products.forEach(function (product) {

        const productCategory =
            product.getAttribute("data-category");

        if (category === "All" ||
            productCategory === category) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= SEARCH ================= */

function searchProducts() {

    const searchValue =
        document.getElementById("searchInput").value
        .toLowerCase()
        .trim();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        const name =
            product.getAttribute("data-name")
            .toLowerCase();

        const category =
            product.getAttribute("data-category")
            .toLowerCase();

        const description =
            product.querySelector(".description")
            .textContent
            .toLowerCase();

        if (
            name.includes(searchValue) ||
            category.includes(searchValue) ||
            description.includes(searchValue)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= FAVORITES ================= */

function toggleFavorite(button, productName) {

    button.classList.toggle("favorite");

    if (button.classList.contains("favorite")) {

        button.innerHTML = "♥";

        if (!favorites.includes(productName)) {
            favorites.push(productName);
        }

        showToast(productName + " added to favorites");

    } else {

        button.innerHTML = "♡";

        favorites =
            favorites.filter(function (item) {
                return item !== productName;
            });

        showToast(productName + " removed from favorites");

    }

}


/* ================= DISPLAY FAVORITES ================= */

function displayFavorites() {

    const list =
        document.getElementById("favoriteList");

    const message =
        document.getElementById("favoriteMessage");

    list.innerHTML = "";

    if (favorites.length === 0) {

        message.style.display = "block";

        return;

    }

    message.style.display = "none";

    favorites.forEach(function (item) {

        const div =
            document.createElement("div");

        div.className = "listing-item";

        div.innerHTML = `
            <h3>${item}</h3>
            <p>This product is saved in your favorites.</p>
        `;

        list.appendChild(div);

    });

}


/* ================= CONTACT SELLER ================= */

function contactSeller(productName) {

    showToast(
        "Seller contact request sent for " + productName
    );

}


/* ================= IMAGE PREVIEW ================= */

function previewImage(event) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }

    const reader =
        new FileReader();

    reader.onload = function (e) {

        document.getElementById("imagePreview").src =
            e.target.result;

    };

    reader.readAsDataURL(file);

}


/* ================= PUBLISH LISTING ================= */

function publishListing(event) {

    event.preventDefault();

    const productName =
        document.getElementById("productName").value;

    const category =
        document.getElementById("productCategory").value;

    const price =
        document.getElementById("productPrice").value;

    const condition =
        document.getElementById("productCondition").value;

    const location =
        document.getElementById("productLocation").value;

    const description =
        document.getElementById("productDescription").value;

    const image =
        document.getElementById("imagePreview").src;


    const listing = {

        name: productName,
        category: category,
        price: price,
        condition: condition,
        location: location,
        description: description,
        image: image

    };


    myListings.push(listing);


    showToast(
        "Your listing has been published successfully!"
    );


    setTimeout(function () {

        showMyListings();

    }, 1000);

}


/* ================= DISPLAY MY LISTINGS ================= */

function displayListings() {

    const container =
        document.getElementById("myListings");

    const message =
        document.getElementById("listingMessage");

    container.innerHTML = "";

    if (myListings.length === 0) {

        message.style.display = "block";

        return;

    }

    message.style.display = "none";


    myListings.forEach(function (listing) {

        const div =
            document.createElement("div");

        div.className = "listing-item";

        div.innerHTML = `

            <div style="
                display:flex;
                gap:15px;
                align-items:center;
            ">

                <img
                    src="${listing.image}"
                    style="
                        width:90px;
                        height:70px;
                        object-fit:cover;
                        border-radius:6px;
                    "
                >

                <div>

                    <h3>${listing.name}</h3>

                    <p>
                        Category: ${listing.category}
                    </p>

                    <p>
                        Price: ₹${listing.price}
                    </p>

                    <p>
                        Condition: ${listing.condition}
                    </p>

                    <p>
                        Location: ${listing.location}
                    </p>

                </div>

            </div>

        `;

        container.appendChild(div);

    });

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= INITIAL PAGE ================= */

window.onload = function () {

    showHome();

};