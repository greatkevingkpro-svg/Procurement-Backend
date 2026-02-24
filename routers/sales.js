const express = require("express");
const {KGLError} = require("../utils/custom-error.js")
const { saleModel } = require("../mongodb-server.js");

// create routers for sales
const router = express.Router();


/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     description: Retrieve a list of all sales in the system
 *     tags:
 *       - Sales
 *     responses:
 *       200:
 *         description: A list of sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the sale
 *                   amount:
 *                     type: number
 *                     description: The amount of the sale
 *                   customerName:
 *                     type: string
 *                     description: The name of the customer who made the sale
 *                   date:
 *                     type: string
 *                     description: The date of the sale
 *                   currency:
 *                     type: string
 *                     description: The currency of the sale
 */
router.get("/", async (req, res) => {
  try {
    let sales = await saleModel.find({});
    res.status(200).json(sales);
  } catch (error) {
    next(new KGLError("failed to find sale", 404))
  }
});




/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     description: Retrieve a specific sale using its MongoDB ObjectId.
 *     tags:
 *       - Sales
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the sale
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the sale
 *                   amount:
 *                     type: number
 *                     description: The amount of the sale
 *                   customerName:
 *                     type: string
 *                     description: The name of the customer who made the sale
 *                   date:
 *                     type: string
 *                     description: The date of the sale
 *                   currency:
 *                     type: string
 *                     description: The currency of the
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Sale not found
 */
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
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     description: Save a new sale to the database
 *     tags:
 *       - Sales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the sale
 *               customerName:
 *                 type: string
 *                 description: The name of the customer who made the sale
 *               date:
 *                 type: string
 *                 description: The date of the sale (in ISO 8601 format)
 *               currency:
 *                 type: string
 *                 description: The currency of the sale (e.g., USD, EUR)
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