const productCtrl = {};
const productModel = require("../models/product.model");
const { generalMessage } = require("../helpers/messages");
const { deleteImg } = require("../helpers/deleteImage");

productCtrl.listProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("user", { password: 0 });
    generalMessage(res, 200, products, true, "Data found.");
  } catch (error) {
    generalMessage(res, 404, "", false, error.message);
  }
};

productCtrl.listProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findById({ _id: id })
      .populate("user", { password: 0 });
    if (!product) {
      return generalMessage(res, 404, "", false, "Product not found.");
    }
    generalMessage(res, 200, product, true, "Data found.");
  } catch (error) {
    generalMessage(res, 404, "", false, error.message);
  }
};

productCtrl.addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new productModel({
      name,
      description,
      price,
      user,
    });
    const { filename } = req.file;
    newProduct.setImgUrl(filename);
    await newProduct.save();
    console.log(newProduct);
    generalMessage(res, 201, newProduct, true, `Product "${name}" added`);
  } catch (error) {
    generalMessage(res, 400, "", false, error.message);
  }
};

productCtrl.productsByUser = async (req, res) => {
  try {
    const id = req.userid;
    const userProducts = await productModel.find(
      { user: id }.populate("user", { password: 0 })
    );
    generalMessage(res, 201, userProducts, true, "User products found.");
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
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
    if (req.file) {
      if (product.nameImg) {
        deleteImg(product.nameImg);
      }
      const { filename } = req.file;
      product.setImgUrl(filename);
      await product.save();
      console.log(product.img);
    }
    const nameImg = product.nameImg;
    const img = product.img;
    const updatedProduct = { name, description, price, nameImg, img };
    await product.updateOne(updatedProduct);
    generalMessage(res, 201, updatedProduct, true, `Product "${name}" updated`);
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

productCtrl.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById({ _id: id });
    if (!product) {
      return generalMessage(res, 404, "", false, "Product not found.");
    }
    if (product.nameImg) {
      deleteImg(product.nameImg);
    }
    await product.deleteOne({ _id: id });
    generalMessage(res, 202, "", false, `Product "${product.name}" deleted.`);
  } catch (error) {
    generalMessage(res, 500, "", true, error.message);
  }
};
module.exports = productCtrl;
