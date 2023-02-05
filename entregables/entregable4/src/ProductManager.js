const fs = require("fs")
const pathFile = ('entregables/products.json');
const incrementableId = async ()=> {
        let idMax = 0
        const dataParse = await getProducts()
        dataParse.forEach(product => {
            if (product.id > idMax) {
                idMax = product.id
            }
        });
        return idMax + 1
    }
const addProduct = async (product) =>{
        try {
            const dataParse = await this.getProducts()
            if(product.title && product.description  && product.price && product.thumbnails ){
                const newProduct = {
                    id: await incrementableId(),
                    title: product.title,
                    description: product.description,
                    price:product.price,
                    thumbnails: product.thumbnails
                }
                dataParse.push({...newProduct})
                await fs.promises.writeFile(pathFile, JSON.stringify(dataParse, null, 2))
            }
            else{
                return "Error"
            }
        } catch(err) {
            return {error:err.message}
        }
    }
    const getProducts = async () => {
        try {
            const data = await fs.promises.readFile(pathFile, "utf-8")
            return JSON.parse(data)
        }
        catch (err) {
            return {error: err.message}
        }
    }
    const getById = async (id) =>{
        try {
            const dataParse = await getProducts()
            return dataParse.find((item) => item.id === id)
        }
        catch (err) {
            return {error: err.message}
        }
    }
    
    const  deleteById = async (id)=> {
        try {
            const dataParse = await getProducts()
            const dataFind = await getById(id)
            if(!dataFind){
                return "Error"
            }
            const filterData = dataParse.filter(product => product.id !== id) 
            await fs.promises.writeFile(pathFile, JSON.stringify(filterData, null, 2))
        }
        catch (err) {
            return {error: err.message}
        }
    }

module.exports = {addProduct, getProducts, getById, deleteById};