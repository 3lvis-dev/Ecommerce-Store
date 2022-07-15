// console.log("Prueba vinculación archivo main.js");

/*---------------------- Cart shop menu ----------------------*/
const navShop = document.getElementById("cart-shop");
const cart = document.getElementById("cart");
const cardClose = document.getElementById("cart-close");


navShop.addEventListener("click", (e) => {
   cart.classList.toggle("open")
});
cardClose.addEventListener("click", (e) => {
   cart.classList.toggle("open")
});

/*---------------------- Fake Data Product ----------------------*/
const data = [
    {
        id: 1,
        name: 'Hoodies',
        price: 14.00,
        image: 'assets/img/featured1.png',
        category: 'hoodies',
        stock: 10
    },
    {
        id: 2,
        name: 'Shirts',
        price: 24.00,
        image: 'assets/img/featured2.png',
        category: 'shirts',
        stock: 15
    },
    {
        id: 3,
        name: 'Sweatshirts',
        price: 24.00,
        image: 'assets/img/featured3.png',
        category: 'sweatshirts',
        stock: 20
    }
];

/*---------------------- Global variability ----------------------*/
const productsContainer = document.querySelector('#products .products__content');
const cartContainer = document.querySelector(".cart__container"); 
const cartSubTotal = document.querySelector(".cart__prices");

const shopObj = {};

cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains("bx-minus")) {
        const id = parseInt(event.target.dataset.id);

        if (shopObj[id].amount === 1) {
            const res = confirm("Sure you want to delete?");

            if (res) {
                delete shopObj[id];
            }
        } else {
            shopObj[id].amount--;
        }
    }

    if (event.target.classList.contains("bx-plus")) {
        const id = parseInt(event.target.dataset.id);

        if (shopObj[id].stock > shopObj[id].amount) {
            shopObj[id].amount++;
        } else {
            alert("No hay mas productos de este tipo disponible");
        }
    }

    if (event.target.classList.contains("bx-trash-alt")) {
        console.log(event.target.dataset.id);
        const id = parseInt(event.target.dataset.id);

        delete shopObj[id];
    }

    // totalItemsInCart()      //Total de productos en carrito
    countProductsInCart()   //Contador de productos en icono de tienda
    totalPrice()            //Precio total de productos en carrito
    printShopCart()         //Imprimir productos en carrito
})

productsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains("button") || event.target.classList.contains("bx")) {
        const id = parseInt(event.target.parentElement.dataset.id);
        const [currentProduct] = data.filter((n) => n.id === id);

        if (shopObj[id]) {
            if (shopObj[id].stock > shopObj[id].amount) {
                shopObj[id].amount++;
            } else {
                alert("No hay mas productos de este tipo disponible");
            }
        } else{
            shopObj[id] = currentProduct;
            shopObj[id].amount = 1;
        }

        // totalItemsInCart()      //Total de productos en carrito
        countProductsInCart()   //Contador de productos en icono de tienda
        totalPrice()            //Precio total de productos en carrito
        printShopCart()         //Imprimir productos en carrito
    }
});

/*---------------------- Count Total Products In Cart ----------------------*/
function countProductsInCart() {
    const countProducts = document.querySelector(".count__products"); 
    countProducts.textContent = Object.values(shopObj).length;
}

// function totalItemsInCart() {
//     const cartItems = document.querySelector("#items-count");
//     cartItems.textContent = Object.values(shopObj).length;
// }

/*---------------------- Total Price ----------------------*/
function totalPrice() {
    const shopArray = Object.values(shopObj);

    let suma = 0;

    shopArray.forEach((n) => {
        suma += n.amount * n.price;
    });

    cartSubTotal.textContent = suma;
}

/*---------------------- Products Cart Shop ----------------------*/
function printShopCart() {
    const shopArray = Object.values(shopObj);
    
    let html = '';

    items = amount + price;

    shopArray.forEach(({id, name, price, image, category, stock, amount}) => {

        html += `
        <article class="cart__card">
        <div class="cart__box">
            <img src="${image}" alt="Hoodies" class="cart__img">
        </div>
        
        <div class="cart__details">
            <h3 class="cart__title">${name}</h3>
            <span class="cart__stock">Stock: ${stock} | <span class="cart__price">$${price}</span></span>
            <span class="cart__subtotal">
                Subtotal: $.00
            </span>
        
            <div class="cart__amount">
                <div class="cart__amount-content">
                    <span class="cart__amount-box minus">
                    <i class="bx bx-minus" data-id="${id}"></i>
                    </span>
        
                    <span class="cart__amount-number">${amount} units</span>
        
                    <span class="cart__amount-box plus">
                    <i class="bx bx-plus" data-id="${id}"></i>
                    </span>
                </div>
        
                <i class="bx bx-trash-alt cart__amount-trash" data-id="${id}"></i>
            </div>
        </div>
        </article>`
    })

    cartContainer.innerHTML = html; 
    // console.log(shopObj);
}

/*---------------------- Products in display ----------------------*/
function printProduct() {
    let html = '';

    data.forEach(({id, name, price, image, category, stock}) => {
    html += `
        <article class="products__card ${category}">
        <div class="products__shape">
        <img src="${image}" alt="${name}" class="products__img">
        </div>

        <div class="products__data">
        <h2 class="products__price">$${price}.00 <span class="products__quantity">| Stock: ${stock}</span></h2>
        <h3 class="products__name">${name}</h3>

        <button class="button products__button" data-id="${id}">
            <i class='bx bx-plus'></i>
        </button>
        </div>
        </article>`
    })

productsContainer.innerHTML += html

}

printProduct()


/*---------------------- Filter animate product ----------------------*/
mixitup(".products__content", {
    selectors: {
      target: ".products__card"
    },
    animation: {
      duration: 400
    }
});