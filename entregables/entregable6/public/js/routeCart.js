const cartLink = document.querySelector('#cartLink');
let cartId = document.cookie.split("=")[1];
const url = `${window.location.protocol}//${window.location.host}/api/cart/${cartId}`
cartLink.href = url;

