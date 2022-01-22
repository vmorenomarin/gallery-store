const { Router } = require("express");
const route = Router();
const userCtrl = require("../controllers/user.controller");
// const upload = require("../middlewares/imgUpload");

route.get("/", userCtrl.listUsers);
route.get("/u/:id", userCtrl.listUserById);
route.post("/register", userCtrl.registerUser);
route.post("/login", userCtrl.loginUser);
route.delete("/:id", userCtrl.deleteUser);

module.exports = route;
