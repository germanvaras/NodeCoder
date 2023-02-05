const socket = io()
const productsContainer = document.getElementById('realtimeproducts')
let products = []
socket.on("all products", async (res) => {
    products = res;
    addProducts();
});

const addProducts = () => {
    const cards = products.map(product =>{
        const card = document.createElement('div');
        card.className = "productContainer"
        card.innerHTML = `
            <img src="${product.thumbnails}" alt="${product.name}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p> Precio: $${product.price}</p>`; 
        return card
    })
    productsContainer.innerHTML= ''; 
    for(const card of cards){
        productsContainer.appendChild(card);
    }
}  