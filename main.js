let carts = document.querySelectorAll('.addCart')

let products = [
    {
        name: 'Orange',
        tag:'orange',
        price: 0.5,
        inCart: 0
    },
    {
        name: 'Banana',
        tag:'banana',
        price: 1.22,
        inCart: 0
    },
    {
        name: 'Lemon',
        tag:'lemon',
        price: 5,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i])
        totalCost(products[i])
    } )
}

function onLoadCartNumbers() {
    let productNumber = localStorage.getItem('cartsNumbers')

    if (productNumber) {
        document.querySelector('.cart span').textContent = productNumber
    }
}

function cartNumbers(product) {
    let productNumber = localStorage.getItem('cartsNumbers')
    productNumber = parseInt(productNumber)

    if (productNumber) {
        localStorage.setItem('cartsNumbers', productNumber + 1 )
        document.querySelector('.cart span').textContent = productNumber + 1
    }else{
        localStorage.setItem('cartsNumbers', 1 )
        document.querySelector('.cart span').textContent = 1
    }

    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem('productInCart')
    cartItems = JSON.parse(cartItems)
    // console.log('my cartItems are', cartItems);

    if(cartItems != null){
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart +=1
    }else{
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productInCart', JSON.stringify(cartItems) )
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
    } else {
        cartCost = 0;
    }
    cartCost = cartCost + parseFloat(product.price);
    localStorage.setItem('totalCost', cartCost.toString());

    // console.log('My cart cost is', cartCost);
    // console.log(typeof cartCost);
}

function displayCart() {
    let cartItems = localStorage.getItem('productInCart');
    cartItems= JSON.parse(cartItems);
    let productContainer = document.querySelector('.products')
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if (cartItems && Object.keys(cartItems).length > 0  && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map((x)=>{
            productContainer.innerHTML += `
            <div class="js">
            <div class="product">
                <span class="icon">&times;</span>
                <span>${x.name}<span>
            </div>
            <div class="price">$${x.price}</div>
            <div class="quantity">
            <i class="fa-solid fa-circle-minus decrease-btn"></i>
            <span>${x.inCart}</span>
            <i class="fa-solid fa-circle-plus increase-btn"></i>
            </div>
            <div class="total">
                $${x.inCart * x.price}
            </div>
            </div>
              `;
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total:
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
            </div>
        `;      

    }
}
  

onLoadCartNumbers()
displayCart()