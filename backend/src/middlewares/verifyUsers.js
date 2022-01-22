const jwt = require("jsonwebtoken");
const { generalMessage } = require("../helpers/messages");
const userModel = require("../models/user.model");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return generalMessage(res, 401, "", false, "Not authorizated.");
  }
};
const token = req.headers.authorization.split(" ")[1];
if (token === null) {
  return generalMessage(res, 401, "", false, "Not authorizated.");
}

jwt.verify(token, secret, async (error, payload) => {
  if (error) {
    return generalMessage(res, 401, "", false, "Not authorizated.");
  }
  const { _id } = payload;
  const user = await userModel.findById({ _id });
  if (!user) {
    return generalMessage(res, 401, "", false, "Not authorizated.");
  }
  req.userid = payload._id;
  next();
});

module.exports = verifyToken;
