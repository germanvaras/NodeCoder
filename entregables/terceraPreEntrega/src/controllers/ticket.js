const {
    serviceGetProductsInCart,
    serviceDeleteCartProduct,
} = require("../services/cart");
const {
    serviceGetProductById,
    serviceUpdateProduct 
} = require("../services/product");
const {
    serviceCreateTicket
} = require("../services/ticket")
const { v4: uuidv4 } = require("uuid");
const purchaseProducts = async (req, res) => {
    try {
        const productsInCart = await serviceGetProductsInCart(req.params.cid);
        let total = 0;
        const productsTicket = [];
        for (const productInCart of productsInCart) {
            const product = await serviceGetProductById(productInCart._id);
            if (productInCart.quantity <= product.stock) {         
                total += (productInCart.price * productInCart.quantity);
                product.stock -= productInCart.quantity; 
                await serviceUpdateProduct(productInCart._id, product)
                productsTicket.push(product);
                await serviceDeleteCartProduct(req.params, productInCart._id);
            }
        }
        console.log(productsTicket)
        let ticket
        if (productsTicket.length) {
            ticket = await serviceCreateTicket({
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: total,
                purchaser: req.user?.name,
            });
        }
        console.log(ticket)
        res.status(201).send({ status: "success", payload: ticket })

    } catch (error) {
        res.status(404).send({ status: "error", payload: error.message });
    }
};

module.exports = { purchaseProducts };
