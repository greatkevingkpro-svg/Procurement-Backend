const express = require("express")
const router = express.Router()
const { KGLError } = require("../utils/custom-error.js")
const { usersModel } = require("../models/users.js")
const { saleModel } = require("../models/sales.js")

router.get("/", async (req, res) => {
  try {
    const [sales, users] = await Promise.all([
      saleModel.find(),
      usersModel.find()
    ]);

    console.log("Sales:", sales);
    console.log("Users:", users);

    res.json({ sales, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = {router}