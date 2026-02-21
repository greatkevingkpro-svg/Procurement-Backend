const express = require("express");
const { Sale } = require("./sale.js");
const { saleModel, creditSalesModel } = require("./mongodb-server.js");
// const { creditSalesModel } = require("./mongodb-server.js");
// const e = require("express");

const sale = new Sale();
const app = express();

// middleware
app.use(express.json());

const simulateSalesAgent = (req, res, next) => {
  req.user = {
    role: "manager",
    username: "ALly"
  }

  next();
}
app.use(simulateSalesAgent);

const userDetailsMiddleware = (req, res, next) => {
  const userDetailString = req.get("user-details");
  if (!userDetailString) {
    res.status(403).json({ message: "there is no user info found" });
  }

  const userDetails = JSON.parse(userDetailString);
  console.log(userDetails);


  if (userDetails.role && userDetails.role.toLowerCase() === "admin") {
    req.user = userDetails
    next();
  } else {
    res.status(403).json({ message: "you are not authorized to access this resource" });
  }

  next();
}

const isDirectorOrManager = (req, res, next) => {
  if (req.user && (req.user.role.toLowerCase() === "director" || req.user.role.toLowerCase() === "manager")) {
    next();
  } else {
    res.status(403).json({ message: "you are not authorized to access this resource" });
  }
  next();
}

// get request to the homepage
app.get("/", (req, res) => {
  res.send('hello world from from Kevin');
});

/**
 * get request to the sales page
 * this method is to retrieve all sales from the database
 */
app.get("/sales", async (req, res) => {
  try{
    let sales = await saleModel.find({});
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ message: "there was an error retrieving sales data from the database", error });
  }
});

/**
 * get request to the credit sales page
 * this method is to retrieve all credit sales from the database
 */
app.get("/credit-sales", async (req, res) => {
  try{
    let sales = await creditSalesModel.find({});
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ message: "there was an error retrieving credit sales data from the database", error });
  }
});

app.get("/sales/:item", async (req, res) => {
  let item = req.params.item;

  // let _sale = sale.getSaleByItem(item);
  // console.log(item, _sale)
  // if (_sale) {
  //   res.status(200).json(_sale);
  // } else {
  //   res.status(404).json({ message: "Sale not found" })
  // }

  try {
    let sales = await saleModel.find({ _item: item });
    if(!sales) {
      res.status(404).json({ message: "sale not found" });
    }
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ message: "failed to retrieve sales data", error });
  }
})


/**
 * post request to the sales page
 * this method is to save a sale to the database
 */
app.post("/sales", async (req, res) => {
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

 
/**
 * post request to the credit sales page
 * this method is to save a credit sale to the database
 */
app.post("/credit-sales", async (req, res) => {
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

app.listen(3000, (err) => {
  if (err) {
    console.log('Errror');
  } else {
    console.log('Server is successfully running on port 3000');
  }
});