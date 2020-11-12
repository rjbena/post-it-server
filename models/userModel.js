const mongoose = require("mongoose");
//graphql layer can handle validation
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
