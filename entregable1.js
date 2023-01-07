class ProductManager {
    constructor() {
        this.products = []
    }
    incrementableId() {
        let idMax = 0
        this.products.forEach(product => {
            if (product.id > idMax) {
                idMax = product.id
            }
        });
        return idMax + 1
        // return this.products.length + 1
          //Si se elimina 1 se repite el id
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.existCode(code)) {
            console.log("Producto Existente")
        }
        else {
            if (title && description && price && thumbnail && code && stock) {
                let newProduct = {
                    id: this.incrementableId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                this.products.push(newProduct);
            }
            else {
                console.log("Faltan datos por completar");
            }
        }

    }
    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        let ans = this.findProduct(id)
        if (!this.findProduct(id)) {
            ans = "Not Found"
        }
        return ans ;
    }
    
    //funciones auxiliares
    existCode(code) {
        let exist = this.products.some(product => product.code == code)
        return exist;
    }
    findProduct(id) {
        let searchProduct = this.products.find(product => product.id == id)
        return searchProduct;
    }
    deleteById(id) {
        let removeItem = this.findProduct(id);
        let index = this.products.indexOf(removeItem);
        let deletebyIndex = this.products.splice(index, 1);
        return deletebyIndex;
    }
}
const productManager = new ProductManager()
productManager.addProduct("Teclado", "Teclado Mecánico", 15000, "imagen", "AB125", 5);
productManager.addProduct("Mouse", "Mouse Gamer", 12000, "imagen", "AB125", 5);
productManager.addProduct("Mouse", "Mouse Gamer", 12000, "imagen", "AB128", 5);
console.log(productManager.getProducts())
productManager.deleteById(2)
productManager.addProduct("Monitor", "Monitor Led", 2000, "imagen", "AB129", 5);
productManager.addProduct("Placa de Audio", "Placa Premium", 2000, "imagen", "AB130", 5);
console.log(productManager.getProducts())
console.log(productManager.getProductsById(3))
console.log(productManager.getProductsById(4))
