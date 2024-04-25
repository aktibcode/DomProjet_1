let carts = document.querySelectorAll(".achat");

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", (event) => {
    event.preventDefault();
    cartNumbers();
  });
}

function cartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  localStorage.setItem("cartNumbers", 1);
}
