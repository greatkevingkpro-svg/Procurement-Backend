const express = require("express");
const { Sale } = require("./sale.js");

const sale = new Sale();
const app = express();

// middleware
app.use(express.json());

// get request to the homepage
app.get("/", (req, res) => {
  res.send('hello world from from Kevin');
});

// get request to the sales page
app.get("/sales", (req, res) => {
  res.json(sale.getAllSales());
});

app.get("/sales/:item", (req, res) => {
  let item = req.params.item;

  let _sale = sale.getSaleByItem(item);
  console.log(item, _sale)
  if(_sale) {
    res.status(200).json(_sale);
  } else {
    res.status(404).json({message: "Sale not found"})
  }
})

// post request to the sales page
app.post("/sales", async (req, res) => {
  let body = req.body;
  let saveState = await sale.add(body);
  if(saveState === true) {
    res.status(201);
    res.json({message: "sale saved successfully"});
  } else {
    res.status(400);
    res.json({message: "sale could not be saved"});
  }
});

app.listen(3000, (err) => {
  if(err) {
    console.log('Errror');
  } else {
    console.log('Server is successfully running on port 3000');
  }
});