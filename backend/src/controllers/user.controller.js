const userCtrl = {};
const userModel = require("../models/user.model");
const { generalMessage } = require("../helpers/messages");
const auth = require("../helpers/auth.helper");
const jsw = require("jsonwebtoken");
const secret = "";

userCtrl.listUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    generalMessage(200, users, true, "Data found.");
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

useCtrl.registerUser = async (req, res) => {
  try {
    const { name, lastaname, email, password } = req.body;
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
    const newUser = await userModel({
      name,
      lastaname,
      email,
      password: auth.encryptpassword(password),
    });
    await newUser.save();
    token: jsw.sign({ _id: newUser._id }, secret, { expiresIn: "1h" });
    generalMessage(
      res,
      201,
      token,
      true,
      "User account created successfully. Welcome."
    );
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

useCtrl.loginUser = async (req, res) => {
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

module.exports = userCtrl;
