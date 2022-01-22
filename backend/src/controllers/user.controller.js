const userCtrl = {};
const userModel = require("../models/user.model");
const { generalMessage } = require("../helpers/messages");
const bcrypt  = require("bcrypt");
const auth = require("../helpers/auth.helper");
const jsw = require("jsonwebtoken");
const secret = "Antaeus";

userCtrl.listUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    generalMessage(res, 200, users, true, "Data found.");
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

userCtrl.listUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return generalMessage(res, 404, "", false, "User not found");
    }
    generalMessage(res, 200, user, true, "User found.");
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

userCtrl.registerUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    console.log({ name, lastname, email, password });
    const user = await userModel.findOne({ email });
    if (user) {
      return generalMessage(
        res,
        409,
        "",
        false,
        `User with ${email} email, already exists`
      );
    }
    const newUser = new userModel({
      name,
      lastname,
      email,
      password: auth.encryptpassword(password),
    });

    await newUser.save();
    token = jsw.sign({ _id: newUser._id }, secret, { expiresIn: "1h" });
    generalMessage(
      res,
      201,
      token,
      true,
      `User account created successfully. Welcome ${newUser.name}.`
    );
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

userCtrl.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return generalMessage(res, 400, false, "Wrong e-mail.");
    }

    const response = bcrypt.compareSync(password, user.password);
    if (response) {
      const token = jsw.sign({ _id: user._id }, secret, { expiresIn: "1h" });
      return generalMessage(
        res,
        201,
        { id: user._id, name: user.name, token },
        true,
        `Welcome ${user.name}`
      );
    }
    generalMessage(res, 400, "", false, "Wrong password. Please, verify.");
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

userCtrl.deleteUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return generalMessage(res, 404, "", false, "User ot found.");
    }
    await userModel.deleteOne({ _id: id });
    generalMessage(res, 200,"",true, "Use were delete.")
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

module.exports = userCtrl;
