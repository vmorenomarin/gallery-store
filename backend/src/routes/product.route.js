const { Router } = require("express");
const route = Router();
const productCtrl = require("../controllers/product.controller");

route.get("/", productCtrl.listProducts);

module.exports = route;
