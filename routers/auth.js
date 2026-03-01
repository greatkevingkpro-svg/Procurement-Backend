const express = require("express")
const router = express.Router()
const { usersModel } = require("../models/users.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {
  try {
    // get user email and password
    const { email, password } = req.body;

    // check if th user is available in the db
    let _user = await usersModel.findOne({ email })
    if (!_user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let isPasswordCorrect = await bcrypt.compare(password, _user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // buildind jwt payload
    const user = {
      userName: _user.userName,
      email: _user.email,
      role: _user.role,
      departement: _user.departement,
      sub: _user._id
    }

    let token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })
  }

})

module.exports = { router }