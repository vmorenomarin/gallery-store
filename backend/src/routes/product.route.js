const { Router } = require("express");
const route = Router();
const productCtrl = require("../controllers/product.controller");
const upload = require("../middlewares/imgUpload");

route.get("/", productCtrl.listProducts);
route.get("/p/:id", productCtrl.listProductById);
route.post("/", upload.single("img"), productCtrl.addProduct);
route.put("/:id", upload.single("img"), productCtrl.updateProduct);
route.delete("/:id", productCtrl.deleteProduct);

module.exports = route;
