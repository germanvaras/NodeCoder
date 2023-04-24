const ProductDao = require('../daos/product.dao')
const productDao = new ProductDao()
class ProductRepository {
    async getProducts(filters) {
        return productDao.getProducts(filters);
    }
    async getById(id) {
        return productDao.getById(id);
    }
    async updateProduct(id, product) {
        return productDao.findOneAndUpdate(id, product);
    }
    async deleteById(id) {
        return productDao.deleteOne(id);
    }
    async addProduct(product) {
        return productDao.create(product);
    }
}

module.exports = ProductRepository;