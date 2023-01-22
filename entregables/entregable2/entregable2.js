const ProductManager = require("../ProductManager")
const product1 = {
    title: "Remera Nube",
    description: "Remera negra de algodón peinado",
    price: 5000,
    thumbnail: 'http://',
    code: "A0123",
    stock: 5,
}
const product2 = {
    title: "Remera Sable",
    description: "Remera negra de algodón peinado",
    price: 6000,
    thumbnail: 'http://',
    code: "A0125",
    stock: 10,
}
const productRemplazo = {
    title: "Remera Remplazo",
    description: "Remera negra de algodón peinado",
    price: 6000,
    thumbnail: 'http://',
    code: "A0125",
    stock: 10,
}
const run = async () => {
    try{
    const manager = new ProductManager("products.json")
    await manager.addProduct(product1)
    await manager.addProduct(product2)
    console.log("primera consulta", await manager.getProducts())
    console.log("byId", await manager.getById(2))
    await manager.updateProduct(2, productRemplazo)
    console.log("segunda consulta", await manager.getProducts())
    console.log("byId", await manager.getById(2))
    // await products.deleteById(2)
    // await products.deleteAll()    
    }
    catch{
        console.log("Houston tenemos un problema")
    }
}
run()