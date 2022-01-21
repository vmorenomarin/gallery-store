const { Router } = require("express");
const route = Router();
const userCtrl = require("../controllers/user.controller");
const upload = require("../middlewares/imgUpload");

route.get("/", userCtrl.listUsers);
route.get("/u", userCtrl.listUserById);
route.post("/register", userCtrl.registerUser);

module.exports = route;
