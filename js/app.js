import products from "./data.js";
let carts = document.querySelectorAll(".achat");

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", (event) => {
    event.preventDefault();
    cartNumbers(products[i]);
    totalCoast(products[i]);
    // plusProduct(products[i]);
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



function totalCoast(product){
    // console.log('The product price is', product.price);
    let cartCost = localStorage.getItem('totalCoast')

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCoast", cartCost+ product.prix)
    } else {
        localStorage.setItem("totalCoast", product.prix)
    }

    
}





function displayCart() {
    let cartItems = localStorage.getItem("produitEnPanier");
  cartItems = JSON.parse(cartItems)
  console.log(cartItems);
  
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('totalCoast')

    console.log(productContainer);
    if (cartItems && productContainer) { 
        
        productContainer.innerHTML = '';

        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                
            <div class="product" >
                <ion-icon name="close-circle"></ion-icon>
                <img src = "./img/produits/femmes/${item.tag}.jpg" style="width: 50px;" >
                <span>${item.name}</span> 
            </div> 
            <div class="price">${item.prix} FCFA</div>
            <div class="quantity">
                <button class="plus" value="${item.enPanier}" id="${item.id}"> + </button>
                <span name="${item.name}" class="valeurEnpanier">${item.enPanier}</span>
                <button class="moins"> - </button>
                
            </div>  
            <div class="total">
                ${item.enPanier * item.prix}
            </div>       
            `
            
        })

        productContainer.innerHTML += ` 
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    ${cartCost},00 
                </h4>
            </div>
        `
  }
  
}

function plusProduct() {
  const ajout = document.getElementsByClassName('plus')
  let cartItems = localStorage.getItem("produitEnPanier");
  let valeur = document.getElementsByClassName('valeurEnpanier')

    
  cartItems = JSON.parse(cartItems)
  console.log(valeur)
  
  
  for (var i = 0; i <= ajout.length; i++) {
    let ajouts = ajout[i]
    ajouts.addEventListener('click', () => {
      console.log(Object.values(cartItems).filter((elt) => {
        return elt.id == ajouts.id;
      }))
    })
  }
}

// let  champSaisie = document.que

  function avoirPanier(idP) {
    let cartItems = localStorage.getItem("produitEnPanier");
    cartItems = JSON.parse(cartItems)
    Object.values(cartItems).filter((cartItem) => {
      if(cartItem.id == idP) {
        return console.log(cartItem.enPanier);
      }
    })

  }


onLoadCartNumbers();
// 
displayCart();
plusProduct()






