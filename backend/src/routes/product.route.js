const { Router } = require("express");
const route = Router();
const productCtrl = require("../controllers/product.controller");
upload = require("../middlewares/imgUpload");

route.get("/", productCtrl.listProducts);
route.get("/product/", productCtrl.listProductById);
route.post("/", upload.single("img"), productCtrl.addProduct);
route.put("/:id", upload.single("img"), productCtrl.updateProduct);

module.exports = route;
