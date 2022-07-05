const router = require('express').Router();
const controller = require("../controllers/products")

router.get("/", controller.getAllProducts)
router.patch("/", controller.setReserved)

module.exports = router