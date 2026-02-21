const express = require("express");
const {KGLError} = require("../utils/custom-error.js")
const { saleModel } = require("../mongodb-server.js");

// create routers for sales
const router = express.Router();


/**
 * get request to the sales page
 * this method is to retrieve all sales from the database
 */
router.get("/", async (req, res) => {
  try {
    let sales = await saleModel.find({});
    res.status(200).json(sales);
  } catch (error) {
    next(new KGLError("failed to find sale", 404))
  }
});




router.get("/:id", async (req, res, next) => {
  let id = req.params.id;

  if(id.length < 5) {
    next(new KGLError("invvalid id signature", 400))
  }

  // let _sale = sale.getSaleByid(id);
  // console.log(id, _sale)
  // if (_sale) {
  //   res.status(200).json(_sale);
  // } else {
  //   res.status(404).json({ message: "Sale not found" })
  // }

  try {
    let sales = await saleModel.find({ _id: id });
    if (!sales) {
      res.status(404).json({ message: "sale not found" });
    }
    res.status(200).json(sales);
  } catch (error) {
    next(new KGLError("failed to find sale", 404));
  }
})


/**
 * post request to the sales page
 * this method is to save a sale to the database
 */
router.post("/", async (req, res) => {
  let body = req.body;

  try {
    let sales = new saleModel(body);

    sales.save()
      .then(() => {
        res.status(201).json({ message: "sale saved successfully to the database", body });
      })
      .catch((error) => {
        res.status(400).json({ message: "there was an error saving the sale to the database", error, body });
      });
  } catch (error) {
    res.status(400).json({ message: "there was an error processing your request", error, body });
  }
});


module.exports = {router};