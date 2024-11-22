const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe?.user || {};

// Инициализация данных
const userId = user.id || "Неизвестен";
const orderHistory = [];

// Элементы DOM
const app = document.getElementById("app");
const profilePage = document.getElementById("profile-page");
const userIdElement = document.getElementById("user-id");
const orderHistoryElement = document.getElementById("order-history");

// Навигация
document.getElementById("profile-btn").addEventListener("click", () => {
  app.classList.add("hidden");
  profilePage.classList.remove("hidden");
  userIdElement.textContent = userId;
  updateOrderHistory();
});

document.getElementById("back-btn").addEventListener("click", () => {
  profilePage.classList.add("hidden");
  app.classList.remove("hidden");
});

// Обновление истории заказов
function updateOrderHistory() {
  orderHistoryElement.innerHTML = orderHistory.length
    ? orderHistory.map(order => `<li>${order}</li>`).join("")
    : "<li>Заказов пока нет.</li>";
}

// Покупка товара
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Ноутбук", price: 15000, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Смартфон", price: 8000, image: "https://via.placeholder.com/150" },
  ];

  const productContainer = document.querySelector(".products");

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p class="price">Цена: ${product.price} ₴</p>
      <button class="buy-btn" data-id="${product.id}" data-name="${product.name}">Купить</button>
    `;
    productContainer.appendChild(productCard);
  });

  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const productName = button.getAttribute("data-name");
      orderHistory.push(`Товар: ${productName}, ID: ${productId}`);
      alert(`Вы купили: ${productName}`);
    });
  });
});
