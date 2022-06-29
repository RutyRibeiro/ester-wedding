const { DataTypes } = require("sequelize");
const database = require ("../db");

const Products = database.define('products', {
    product_id:{
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true,
    },
    product_name:{
        type: DataTypes.STRING,
    },   
    product_desc:{
        type: DataTypes.STRING,
    },
    product_img:{
        type: DataTypes.STRING,
    },  
    product_reserved:{
        type: DataTypes.BOOLEAN,
    },
    client_name:{
        type: DataTypes.STRING,
    },
    client_email:{
        type: DataTypes.STRING,
    },
},
{timestamps: false});

Products.sync();

module.exports = Products;