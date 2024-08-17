import config from "./config.js";

let menu = document.querySelector("#menu");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  // Открытие модального окна и установка значения product_id
  document.querySelectorAll(".modal-open").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id");
      document.getElementById("modal-product-id").value = productId;
      document.getElementById("main-modal").style.display = "flex";
    });
  });

  // Закрытие модального окна
  document.querySelector(".close-btn").addEventListener("click", function () {
    document.getElementById("main-modal").style.display = "none";
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener("click", function (event) {
    if (event.target === document.getElementById("main-modal")) {
      document.getElementById("main-modal").style.display = "none";
    }
  });
});

const scriptURL = config.apiURL;

const form = document.forms["contact-form"];

const sendText = document.getElementById("sendText");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      sendText.innerHTML =
        "Ваша заявка отправлена! Спасибо за обращение, мы скоро с вами свяжемся.";
      setTimeout(function () {
        sendText.innerHTML = "";
        document.getElementById("main-modal").style.display = "none"; // Закрытие модального окна после 5000 мс
      }, 5000); // 5000 мс = 5 секунд
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
    });
});
