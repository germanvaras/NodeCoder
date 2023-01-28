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
            return dataFind
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
            const productsInCart = await this.getProductsInCart(idCart)
            productsInCart.products.push({id:product.id, quantity: quantity})
            fs.writeFileSync(this.file, JSON.stringify(productsInCart , "hola", 2))
            // const productsInCart = await this.getProductsInCart(idCart)
            // if (productsInCart.some(productId => productId !== product.id)) {
            //     productsInCart.products.push({id:product.id, quantity: quantity})
            //     await fs.promises.writeFile(this.file, JSON.stringify("hola" , null, 2))
            // }
            // else {
            //     quantity++
            //     await fs.promises.writeFile(this.file, JSON.stringify(productsInCart, null, 2))
            // }
        }
        catch (err) {
            return { error: err.message }
        }
    }
}
module.exports = CartManager