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
            if(product.title && product.description && product.code && product.price && product.status && product.stock && product.category ){
                const newProduct = {
                    id: await this.incrementableId(),
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price:product.price,
                    status: true,
                    category: product.category,
                    thumbnails: product.thumbnails
                }
                dataParse.push({...newProduct})
                await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2))
            }
            else{
                return "Error"
            }
        } catch(err) {
            return {error:err.message}
        }
    }
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(data)
        }
        catch (err) {
            return {error: err.message}
        }
    }
    async getById(id) {
        try {
            const dataParse = await this.getProducts()
            return dataParse.find((item) => item.id === id) || null
        }
        catch (err) {
            return {error: err.message}
        }
    }
    async updateProduct(id, product) {
        try {
            const dataParse = await this.getProducts()
            const position = dataParse.findIndex((productId) => productId.id === id)
            product.id = id
            dataParse.splice(position, 1, product)
            await fs.promises.writeFile(this.file, JSON.stringify(dataParse, null, 2))
        }
        catch (err) {
            return {error: err.message}
        }
    }
    async deleteById(id) {
        try {
            const dataParse = await this.getProducts()
            const filterData = dataParse.filter(product => product.id !== id) || null
            await fs.promises.writeFile(this.file, JSON.stringify(filterData, null, 2))
        }
        catch (err) {
            return {error: err.message}
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, "[]");
        } catch (err) {
            return {error: err.message}
        }
    }
}
module.exports = ProductManager;