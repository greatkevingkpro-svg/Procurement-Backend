const express = require("express");
const { Sale } = require("./sale.js");
const {router: salesRouter} = require("./routers/sales.js")
const {router: creditSales} = require("./routers/credit-sales.js")
const {simulateSalesAgent} = require("./middleware/index.js")
const {errorHandler} = require("./middleware/erro.js")


// const { creditSalesModel } = require("./mongodb-server.js");
// const e = require("express");

const sale = new Sale();
const app = express();

// middleware
app.use(express.json());

app.use(simulateSalesAgent);


// get request to the homepage
app.get("/", (req, res) => {
  res.send('hello world from from Kevin');
});

app.use("/sales",salesRouter);
app.use("/credit-sales", creditSales);

app.use(errorHandler);

app.listen(3000, (err) => {
  if (err) {
    console.log('Errror');
  } else {
    console.log('Server is successfully running on port 3000');
  }
});