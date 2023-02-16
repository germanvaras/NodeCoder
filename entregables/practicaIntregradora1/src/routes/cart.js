// const cartRouter = Router();
// const CartManager = require("../src/CartManager");
// const managerCart = new CartManager("./entregables/cart.json");
// const ProductManager = require("../src/ProductManager");
// const managerProduct = new ProductManager("./entregables/products.json");

// cartRouter.get('/:cid', async (req, res) => {
//     const id = Number(req.params.cid)
//     const productsInCart = await managerCart.getProductsInCart(id)
//     res.send(productsInCart)
// })
// cartRouter.post('/', async (req, res) => {
//     try {
//         await managerCart.createCart();
//         res.send("Carrito creado exitosamente")
//     }
//     catch (err) {
//         res.status(500).send({ error: err.message })
//     }
// })
// cartRouter.post('/:cid/product/:pid', async (req, res) => {
//     try {
//         const cartId = Number(req.params.cid);
//         const productId = Number(req.params.pid)
//         const findProduct = await managerProduct.getById(productId)
//         if (!findProduct) {
//             res.status(404).send({ error: `El producto con ${productId} no existe` })
//         }
//         else {
//             await managerCart.addProductInCart(cartId, findProduct)
//             res.send(`Producto con id: ${productId} agregado correctamente al carrito con id ${cartId}`)
//         }
//     }
//     catch (err) {
//         res.status(500).send({ error: err.message })
//     }
// })

// module.exports = cartRouter