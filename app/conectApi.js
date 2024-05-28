const yearElement = document.getElementById("footer__year");
yearElement.textContent = new Date().getFullYear() || "2024";

async function getProducts() {
  const res = await fetch("http://localhost:3001/products");
  const products = await res.json();
  return products;
}

async function createProduct(name, price, imageUrl) {
  const conection = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, imageUrl }),
  });

  if (!conection.ok) {
    throw new Error("Não foi possível criar um novo produto");
  }

  const product = await conection.json();
  return product;
}

async function deleteProduct(id) {
  const conection = await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
  });

  if (!conection.ok) {
    throw new Error("Não foi possível deletar o produto");
  }
}

export const products = {
  getProducts,
  createProduct,
  deleteProduct,
};
