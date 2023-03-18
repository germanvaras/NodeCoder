let idCart = ''
const getIdCart = async () =>{
    const baseUrl = `${window.location.protocol}//${window.location.host}/api/cart`;
    await fetch(baseUrl, {
        method: "get",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json())
    .then(data => idCart = data[0]._id );
}

const addProductInCart = async (pid) => {
    await getIdCart();
    const baseUrl = `${window.location.protocol}//${window.location.host}/api/`;
    const endpoint = `cart/${idCart}/product/${pid}`;
    const url = `${baseUrl}${endpoint}`;
    await fetch(url, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    });
};