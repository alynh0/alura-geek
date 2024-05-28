import { products } from "./conectApi.js";

const productList = document.getElementById("products__list");

export default async function buildCard(name, price, imageUrl, id) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
  const card = document.createElement("li");
  card.classList.add("products__card");
  card.innerHTML = `
    <img src="${imageUrl}" alt="${name}" />
    <h3>${name}</h3>
    <div class="products__card__footer">
        <p>${formattedPrice}</p>
        <button type="button" class="product__delete">
          <img src="./assets/trash_icon.png" alt="Deletar produto" />
        </button>
    </div>
  `;

  const deleteButton = card.querySelector(".product__delete");
  deleteButton.addEventListener("click", () => {
    card.remove();
    deleteProductFromServer(id);
  });

  return card;
}

async function showProducts() {
  try {
    const getProductList = await products.getProducts();
    for (const product of getProductList) {
      const card = await buildCard(
        product.name,
        product.price,
        product.imageUrl,
        product.id
      );
      productList.appendChild(card);
    }
  } catch (error) {
    productList.innerHTML = `<h2>Não foi possível carregar os produtos. ${error}</h2>`;
  }
}

async function deleteProductFromServer(id) {
  try {
    await products.deleteProduct(id);
    alert("Produto deletado com sucesso");
  } catch (error) {
    alert("Não foi possível deletar o produto: " + error);
  }
}

showProducts();
