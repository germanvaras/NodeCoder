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
        } catch {
            await fs.promises.writeFile(this.file, JSON.stringify([{ ...product, id: 1 }]))
        }
    }
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(data)
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async getById(id) {
        try {
            const dataParse = await this.getProducts()
            return dataParse.find((item) => item.id === id) || null
        }
        catch (err) {
            throw new Error(err)
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
            throw new Error(err)
        }
    }
    async deleteById(id) {
        try {
            const dataParse = await this.getProducts()
            const filterData = dataParse.filter(product => product.id !== id) || null
            await fs.promises.writeFile(this.file, JSON.stringify(filterData, null, 2))
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, "[]");
        } catch (err) {
            throw new Error(err);
        }
    }
}
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
    const products = new ProductManager("./entregables/products.json")
    await products.addProduct(product1)
    await products.addProduct(product2)
    console.log("primera consulta", await products.getProducts())
    console.log("byId", await products.getById(2))
    await products.updateProduct(2, productRemplazo)
    console.log("segunda consulta", await products.getProducts())
    console.log("byId", await products.getById(2))
    // await products.deleteById(2)
    // await products.deleteAll()    
    }
    catch{
        console.log("Houston tenemos un problema")
    }
}
run()