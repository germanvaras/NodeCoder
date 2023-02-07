const socket = io()
const productsContainer = document.getElementById('realtimeproducts')
const form = document.getElementById("formProduct");
let products = []
socket.on("all products", async (res) => {
    products = res;
    addProducts();
});

const addProducts = () => {
    const cards = products.map(product => {
        const card = document.createElement('div');
        card.className = "productContainer"
        card.innerHTML = `
        <img src="${product.thumbnails}" alt="${product.name}" class="cardImg">
        <div class="cardInfo">
        <h3 class="cardTitle">${product.title} </h3>
        <p class="cardDescription">${product.description}</p>
        <p class="cardPrice"> Precio: $${product.price}</p>
        <button class="cardButton" onclick="deleteProduct(${product.id})" class="iconTrash">Eliminar</button>;
        </div>`
        return card
    })
    productsContainer.innerHTML = '';
    for (const card of cards) {
        productsContainer.appendChild(card);
    }
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
});
const submitForm = async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const img = document.getElementById("img").value;

    await fetch("http://localhost:4200/api/products", {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            thumbnails: img,
        }),
    });
    form.reset();
};
const deleteProduct = async (id) => {
    await fetch(`http://localhost:4200/api/products/${id}`, {
        method: "delete",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    });
};