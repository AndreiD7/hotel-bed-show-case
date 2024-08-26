let menu = document.querySelector("#menu");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

// Функция для открытия/закрытия меню
menu.onclick = function () {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

// Закрытие меню при клике на пункт меню
document.querySelectorAll(".navbar ul li a").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navbar.classList.contains("active")) {
      menu.classList.remove("fa-times");
      navbar.classList.remove("active");
    }
  });
});

// Закрытие меню при клике вне его области
document.addEventListener("click", function (event) {
  if (!menu.contains(event.target) && !navbar.contains(event.target)) {
    if (navbar.classList.contains("active")) {
      menu.classList.remove("fa-times");
      navbar.classList.remove("active");
    }
  }
});

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

const ScriptURL = process.env.VITE_GOOGLE_SHEETS_KEY;
const form = document.forms["contact-form"];

const sendText = document.getElementById("sendText");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(ScriptURL, { method: "POST", body: new FormData(form) })
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
