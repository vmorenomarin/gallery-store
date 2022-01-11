const productCtrl = {};
const productModel = require("../models/product.model");
const { generalMessage } = require("../helpers/messages");
const { deleteImg } = require("../helpers/deleteImage");

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

productCtrl.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    product = await productModel.findOne({ _id: id });
    if (!product) {
      return generalMessage(res, 404, "", false, "Product not found.");
    }
    const name = req.body.name || product.name;
    const description = req.body.description || product.description;
    const price = req.body.price || product.price;
    const nameImg = product.nameImg;
    const img = product.img;
    if (req.file) {
      deleteImg(product.nameImg);
      const filename = req.file;
      product.setImgUrl(filename);
    }
    const updatedProduct = { name, description, price, nameImg, img };
    await product.updateOne(updatedProduct);
    generalMessage(res, 201, updatedProduct, true, `Product ${name} updated`);
  } catch (error) {
    generalMessage(res, 404, "", false, error.message);
  }
};

module.exports = productCtrl;
