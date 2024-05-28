import { products } from "./conectApi.js";

const form = document.querySelector(".add_product__form");

async function createProduct(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("image").value;

  try {
    await products.createProduct(name, price, imageUrl);
  } catch (error) {
    alert("Não foi possível criar um novo produto" + error);
  }

  form.reset();
}

form.addEventListener("submit", (event) => createProduct(event));
