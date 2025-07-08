let products = [
  { id: "p1", name: "Keyboard" },
  { id: "p2", name: "Mouse" },
  { id: "p3", name: "Monitor" },
];

const productListEl = document.getElementById("product-list");

// Renders all products
function renderProducts() {
  productListEl.innerHTML = ""; // clear it first

  products.forEach((product) => {
    productListEl.innerHTML += `
      <div class="product">
        <span>${product.name}</span>
        <button class="delete-btn" data-id="${product.id}">Delete</button>
      </div>
    `;
  });

  // 🧠 TODO: Handle delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      products = products.filter((product) => product.id !== id);
      renderProducts();
    });
  });
}

// Initial render
renderProducts();
