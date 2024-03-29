const cartDataSpan = document.getElementById("cartQuantity");
const cartLink = document.querySelector('#cartLink');
let cartId = document.cookie.split("=")[1];
const url = `${window.location.protocol}//${window.location.host}/api/cart/${cartId}`
cartLink.href = url;
const getQuantityInCart = async () => {
    let quantity = 0
    try {
        const response = await fetch(`${window.location.protocol}//${window.location.host}/api/cart/quantity/${cartId}`, {
            method: "get",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        data.forEach(element => {
            quantity += element.quantity
        });
        return quantity
    } catch (error) {
        console.error(error.message);
    }
}
const getCart = async() =>{
    let quantityInCart  = await getQuantityInCart();
    quantityInCart === 0 || !quantityInCart ? cartDataSpan.innerHTML = "" : cartDataSpan.innerHTML = quantityInCart
} 
getCart()


