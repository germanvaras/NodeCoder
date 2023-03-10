const fs = require("fs")
class CartManager {
    constructor(file) {
        this.file = file
    }
    async incrementableId() {
        let idMax = 0
        const dataParse = await this.getCart()
        dataParse.forEach(cart => {
            if (cart.id > idMax) {
                idMax = cart.id
            }
        });
        return idMax + 1
    }
    async getCart() {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(data)
        }
        catch (err) {
            return { error: err.message }
        }
    }
    async getProductsInCart(id) {
        try {
            const data = await this.getCart()
            const dataFind = data.find((cart)=> cart.id === id)
            return dataFind.products
        }
        catch (err) {
            return { error: err.message }
        }
    }
    async createCart() {
        try {
            const dataParse = await this.getCart()
            dataParse.push({ id: await this.incrementableId(), products: [] })
            await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2))
        }
        catch (err) {
            return { error: err.message }
        }
    }
    async addProductInCart(idCart, product) {
        try {
            let quantity = 1
            const data = await this.getCart()
            const indexData = data.findIndex((cart)=> cart.id === idCart )
            const dataProduts = data[indexData].products
            const findProduct = dataProduts.find((existProd)=>existProd.id === product.id)
            if(findProduct) {
                findProduct.quantity += 1
                fs.writeFileSync(this.file, JSON.stringify(data, null, 2))
            }
            else{
                dataProduts.push({id:product.id, quantity: quantity})
                fs.writeFileSync(this.file, JSON.stringify(data, null, 2))
            }
        }
        catch (err) {
            return { error: err.message }
        }
    }
}
module.exports = CartManager