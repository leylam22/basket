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

// function totalCost(product) {
//     // console.log('the product prize is ', product.price);
//     let cartCost= localStorage.getItem('totalCost')
//     console.log('my cart cost is ', cartCost);
//     console.log(typeof cartCost);
    
//     if(cartCost != null){
//         cartCost = parseInt(cartCost)
//         localStorage.setItem('totalCost', cartCost + product.price)
//     }else{
//         localStorage.setItem("totalCost", product.price)
//     }
// }

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
    } else {
        cartCost = 0;
    }
    cartCost = cartCost + parseFloat(product.price);
    localStorage.setItem('totalCost', cartCost.toString());

    console.log('My cart cost is', cartCost);
    console.log(typeof cartCost);
}


onLoadCartNumbers()