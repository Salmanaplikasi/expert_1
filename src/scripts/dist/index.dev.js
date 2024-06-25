"use strict";

require("regenerator-runtime");

require("../styles/css/main.css");

var _DATA = _interopRequireDefault(require("../public/data/DATA.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var hamburger = document.getElementById("hamburger");
var menu = document.getElementById("menu");
var hero = document.querySelector(".hero-container");
var main = document.getElementById("main-content");
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
    targetElement.scrollIntoView({
      behavior: "smooth"
    });
  });
});

var getExploreRestaurant = function getExploreRestaurant(data) {
  var restaurantItem = document.getElementById("explore-restaurant__list");
  data.restaurants.forEach(function (restaurant) {
    var card = document.createElement("article");
    card.setAttribute("tabindex", "0");
    card.classList.add("card");
    card.innerHTML = "\n        <div class=\"card-image\">\n            <img class=\"card-image__item\" alt=\"".concat(restaurant.name, "\" src=\"").concat(restaurant.pictureId, "\"/>\n            <span class=\"card-image__rating\">\n                <span>").concat(restaurant.rating, "</span>\n            </span>\n        </div>\n        <div class=\"card-content\">\n            <p class=\"card-content__title\">").concat(restaurant.name, " - ").concat(restaurant.city, "</p>\n            <p class=\"card-content__description\">Description: ").concat(restaurant.description, "</p>\n        </div>\n      ");
    card.addEventListener("click", function () {
      openPopup(restaurant);
    });
    restaurantItem.appendChild(card);
  });
};

var openPopup = function openPopup(restaurant) {
  var popupContent = document.getElementById("popupContent");
  popupContent.innerHTML = "\n      <h3>".concat(restaurant.name, "</h3>\n      <p>").concat(restaurant.description, "</p>\n      <p><strong>Specialties:</strong> ").concat(restaurant.specialties ? restaurant.specialties.join(", ") : "", "</p>\n      <p><strong>Address:</strong> ").concat(restaurant.address, "</p>\n      <p><strong>Phone:</strong> ").concat(restaurant.phone, "</p>\n      <p><strong>Opening Hours:</strong></p>\n      <ul>\n        ").concat(restaurant.openingHours ? Object.entries(restaurant.openingHours).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        day = _ref2[0],
        hours = _ref2[1];

    return "<li>".concat(day, ": ").concat(hours, "</li>");
  }).join("") : "", "\n      </ul>\n      <button id=\"closePopupButton\">Close</button>\n    ");
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "block";
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  var content = document.getElementById("content");
  content.classList.add("blur-background");
  document.body.classList.add("popup-open");
  var closeButton = document.getElementById("closePopupButton");
  closeButton.addEventListener("click", function () {
    closePopup();
  });
};

var closePopup = function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  var content = document.getElementById("content");
  content.classList.remove("blur-background");
  document.body.classList.remove("popup-open");
};

getExploreRestaurant(_DATA["default"]);