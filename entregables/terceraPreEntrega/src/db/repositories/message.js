const Product = require('../db/model/product');

class ProductRepository {
    async getAllProducts(page, limit) {
        return await Product.paginate({}, { page, limit });
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async createProduct(productData) {
        const newProduct = new Product(productData);
        return await newProduct.save();
    }

    async updateProduct(productId, productData) {
        return await Product.findByIdAndUpdate(productId, productData, { new: true });
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

module.exports = ProductRepository;