const express = require("express");
const protectedRouter = express.Router();
const { authorizeRoles } = require("./salesAuth.js");
const { creditSalesModel } = require("../models/sales.js")

// Example protected route
protectedRouter.get(
  "/credit-sales",
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const creditSales = await creditSalesModel.find();
      res.json(creditSales);
    } catch {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = {protectedRouter};