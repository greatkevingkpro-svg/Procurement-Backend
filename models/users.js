const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 5
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true
  },
  departement: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

const usersModel = mongoose.model("users", usersSchema);

module.exports = { usersModel }