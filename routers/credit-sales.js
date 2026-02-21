const express = require("express");
const { creditSalesModel } = require("../mongodb-server.js");

// create routers for sales
const router = express.Router();


/**
 * get request to the credit sales page
 * this method is to retrieve all credit sales from the database
 */
router.get("/", async (req, res) => {
  try {
    let sales = await creditSalesModel.find({});
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ message: "there was an error retrieving credit sales data from the database", error });
  }
});

/**
 * post request to the credit sales page
 * this method is to save a credit sale to the database
 */
router.post("/", async (req, res) => {
  let body = req.body;

  try {
    let sales = new creditSalesModel(body);

    sales.save()
      .then(() => {
        res.status(201).json({ message: "credit sale saved successfully to the database", body });
      })
      .catch((error) => {
        res.status(400).json({ message: "there was an error saving the credit sale to the database", error, body });
      });
  } catch (error) {
    res.status(400).json({ message: "there was an error processing your request", error, body });
  }
});

/**
 * patch method
 */
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    let updatedCreditSale = await creditSalesModel.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (updatedCreditSale) {
      res.status(200).json({ message: "update successfully", body })
    } else {
      res.status(400).json({ message: "failed to update" });
    }
  } catch (err) {
    res.status(400).json({ message: "failed to update credit sale", err })
  }
})

/**
 * delete method
 */
router.delete("/:creditSaleId", async (req, res) => {
  try {
    const id = req.params.creditSaleId;

    let result = await creditSalesModel.findByIdAndDelete(id);

    if(result) {
      res.status(200).json({message:"crdit deleted successfully", body:result})
    } else {
      res.status(400).json({message:"failed to delete credit"})
    }

  } catch (err) {
    res.status(400).json({message:"failed to delete credit", err})
  }
})

module.exports = {router};