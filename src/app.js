const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");
const products = require("./routes/products");


app.use(express.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Accessf-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use("/", routes);
app.use("/products", products);


module.exports = app;

