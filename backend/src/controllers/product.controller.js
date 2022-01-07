const productCtrl = {};
const productModel = require("../models/product.model");
const { generalMessage } = require("../helpers/messages");

productCtrl.listProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    generalMessage(res, 200, products, true, "Data found.");
  } catch (error) {
    generalMessage(res, 404, "", false, error.message);
  }
};

productCtrl.listProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById({ _id: id });
  } catch (error) {}
};

productCtrl.addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new productModel({
      name,
      description,
      price,
    });
    const { filename } = req.file;
    newProduct.setImgUrl(filename);
    await newProduct.save();
    console.log(newProduct);
    generalMessage(res, 201, newProduct, true, `Product ${name} added`);
  } catch (error) {
    generalMessage(res, 400, "", false, error.message);
  }
};

module.exports = productCtrl;
