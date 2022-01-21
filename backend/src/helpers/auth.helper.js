const bcrypt = require("bcrypt"); // Library to hash password
const { generalMessage } = require("./messages");

const auth = {};

// Next lines build a function to encrypt password from user.

auth.encryptpassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10); // This line adds some random characters to the user password.
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    generalMessage(res, 500, "", false, error.message);
  }
};

module.exports = auth;
