const Products = require("../models/products")

const getAllProducts = async (req, res) => {
    try{
        const products = await Products.findAll()

        products && products.length > 0 ? res.status(200).send(products) : res.status(204).send()
    } catch (error){
        console.log(error)
        res.status(500).send({
            message: error.message
        })
    }
};

module.exports = {
    getAllProducts,
}