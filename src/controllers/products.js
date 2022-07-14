const { Sequelize } = require("sequelize");
const Products = require("../models/products")
const { mailSender } = require("../services/email")

const getAllProducts = async (req, res) => {
    try{
        const products = await Products.findAll({
            order:[['product_reserved','ASC']],
            attributes:["product_id","product_name","product_desc","product_img","product_reserved"]
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
    
    const t = await Products.sequelize.transaction()
    try{
        console.log(req.body)
        const {id, name, email, products} = req.body;
 
        const product = await Products.update({
            product_reserved:true, 
            client_name: name, 
            client_email: email},
            {where:{product_id:id}, transaction: t})

        const emailHasError = await mailSender(email, products)

        if (emailHasError) throw("Erro ao enviar email")
        
        await t.commit();
        
        product && product[0] > 0 ? res.status(200).send({message:"Produto reservado!"}) 
        : res.status(404).send({message: `Produto de id ${id} não encontrado!`})
    
    } catch(error){
        console.log(error)
        
        await t.rollback();
        
        res.status(500).send({message: 'Error'})      
    }
};

module.exports = {
    getAllProducts,
    setReserved
}

