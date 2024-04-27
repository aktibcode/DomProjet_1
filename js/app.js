import products from "./data.js";
let carts = document.querySelectorAll(".achat");

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", (event) => {
    event.preventDefault();
    cartNumbers(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".panier span").textContent = productNumbers;
  }
}

/*
    1- Recuperation de l'id de l'element pour ajout dans le localStorages
    2- Envoir dans le panier plus incrementation
*/
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".panier span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".panier span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("produitEnPanier");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }

    cartItems[product.tag].enPanier += 1;
  } else {
    product.enPanier = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("produitEnPanier", JSON.stringify(cartItems));
}

onLoadCartNumbers();
