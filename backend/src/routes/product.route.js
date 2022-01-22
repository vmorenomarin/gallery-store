const { Router } = require("express");
const route = Router();
const productCtrl = require("../controllers/product.controller");
const upload = require("../middlewares/imgUpload");
const verifyToken = require("../middlewares/verifyUsers");

route.get("/", verifyToken, productCtrl.listProducts);
route.get("/p/:id", verifyToken, productCtrl.listProductById);
// route.get("/p/u", verifyToken, productCtrl.productsByUser);
route.post("/", verifyToken, upload.single("img"), productCtrl.addProduct);
route.put("/:id", verifyToken, upload.single("img"), productCtrl.updateProduct);
route.delete("/:id", verifyToken, productCtrl.deleteProduct);

module.exports = route;
