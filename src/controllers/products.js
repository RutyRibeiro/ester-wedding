const Products = require("../models/products")

const getAllProducts = async (req, res) => {
    try{
        const products = await Products.findAll({
            order:[['product_reserved','ASC']]
        })

        products && products.length > 0 ? res.status(200).send(products) : res.status(204).send()
    } catch (error){
        console.log(error)
        res.status(500).send({
            message: error.message
        })
    }
};

const setReserved = async (req, res) => {
    try{
        // const id = req.params.id;
        const {id, name, email} = req.body;
        const product = await Products.update({
            product_reserved:true, 
            client_name: name, 
            client_email: email},
            {where:{product_id:id}})

        product && product[0] > 0 ? res.status(200).send({message:"Produto reservado!"}) 
        : res.status(404).send({message: `Produto de id ${id} não encontrado!`})
    
    } catch(error){
        res.status(500).send({message: 'Error'})
    }
};

module.exports = {
    getAllProducts,
    setReserved
}

