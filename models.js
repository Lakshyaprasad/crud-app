const mongoose = require("mongoose");

const usersSchema = require("./schema");

const User = mongoose.model("Users",usersSchema);

module.exports = User;