import "regenerator-runtime";
import "../styles/css/main.css";
import restaurantData from "../public/data/DATA.json";

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const hero = document.querySelector(".hero-container");
const main = document.getElementById("main-content");

hamburger.addEventListener("click", function (event) {
  menu.classList.toggle("open");
  event.stopPropagation();
});

hero.addEventListener("click", function () {
  menu.classList.remove("open");
});

main.addEventListener("click", function () {
  menu.classList.remove("open");
});

document.addEventListener("DOMContentLoaded", function () {
  var scrollButton = document.getElementById("scroll_button");

  scrollButton.addEventListener("click", function () {
    var targetElement = document.getElementById("explore-restaurant");

    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});

const getExploreRestaurant = (data) => {
  const restaurantItem = document.getElementById("explore-restaurant__list");
  data.restaurants.forEach((restaurant) => {
    const card = document.createElement("article");
    card.setAttribute("tabindex", "0");
    card.classList.add("card");

    card.innerHTML = `
        <div class="card-image">
            <img class="card-image__item" alt="${restaurant.name}" src="${restaurant.pictureId}"/>
            <span class="card-image__rating">
                <span>${restaurant.rating}</span>
            </span>
        </div>
        <div class="card-content">
            <p class="card-content__title">${restaurant.name} - ${restaurant.city}</p>
            <p class="card-content__description">Description: ${restaurant.description}</p>
        </div>
      `;

    card.addEventListener("click", () => {
      openPopup(restaurant);
    });

    restaurantItem.appendChild(card);
  });
};

const openPopup = (restaurant) => {
  const popupContent = document.getElementById("popupContent");
  popupContent.innerHTML = `
      <h3>${restaurant.name}</h3>
      <p>${restaurant.description}</p>
      <p><strong>Specialties:</strong> ${
        restaurant.specialties ? restaurant.specialties.join(", ") : ""
      }</p>
      <p><strong>Address:</strong> ${restaurant.address}</p>
      <p><strong>Phone:</strong> ${restaurant.phone}</p>
      <p><strong>Opening Hours:</strong></p>
      <ul>
        ${
          restaurant.openingHours
            ? Object.entries(restaurant.openingHours)
                .map(([day, hours]) => `<li>${day}: ${hours}</li>`)
                .join("")
            : ""
        }
      </ul>
      <button id="closePopupButton">Close</button>
    `;

  const popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "block";

  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";

  const content = document.getElementById("content");
  content.classList.add("blur-background");

  document.body.classList.add("popup-open");

  const closeButton = document.getElementById("closePopupButton");
  closeButton.addEventListener("click", () => {
    closePopup();
  });
};

const closePopup = () => {
  const popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";

  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";

  const content = document.getElementById("content");
  content.classList.remove("blur-background");

  document.body.classList.remove("popup-open");
};

getExploreRestaurant(restaurantData);
