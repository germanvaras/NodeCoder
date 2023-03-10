const fs = require("fs")
class ProductManager {
    constructor(file) {
        this.file = file
    }
    async incrementableId() {
        let idMax = 0
        const dataParse = await this.getProducts()
        dataParse.forEach(product => {
            if (product.id > idMax) {
                idMax = product.id
            }
        });
        return idMax + 1
    }
    async addProduct(product) {
        try {
            const dataParse = await this.getProducts()
            dataParse.push({ ...product, id: await this.incrementableId() })
            await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2))
        } catch(err) {
            return {error: err}
        }
    }
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(data)
        }
        catch (err) {
            return {error: err}
        }
    }
    async getById(id) {
        try {
            const dataParse = await this.getProducts()
            return dataParse.find((item) => item.id === id) || null
        }
        catch (err) {
            return {error: e}
        }
    }
    async updateProduct(id, product) {
        try {
            const dataParse = await this.getProducts()
            const position = dataParse.findIndex((productId) => productId.id === id)
            console.log(position)
            product.id = id
            dataParse.splice(position, 1, product)
            await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2))
        }
        catch (err) {
            return {error: e}
        }
    }
    async deleteById(id) {
        try {
            const dataParse = await this.getProducts()
            const filterData = dataParse.filter(product => product.id !== id) || null
            await fs.promises.writeFile(this.file, JSON.stringify(filterData, null, 2))
        }
        catch (err) {
            return {error: e}
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, "[]");
        } catch (err) {
            return {error: err}
        }
    }
}
module.exports = ProductManager;