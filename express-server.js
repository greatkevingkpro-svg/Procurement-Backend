const express = require("express");
const { Sale } = require("./sale.js");
const e = require("express");

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
  if(!userDetailString) {
    res.status(403).json({message:"there is no user info found"});
  }

  const userDetails = JSON.parse(userDetailString);
  console.log(userDetails);


  if(userDetails.role && userDetails.role.toLowerCase() === "admin") {
    req.user = userDetails
    next();
  } else {
    res.status(403).json({message:"you are not authorized to access this resource"});
  }

  next();
}

const isDirectorOrManager = (req, res, next) => {
  if(req.user && (req.user.role.toLowerCase() === "director" || req.user.role.toLowerCase() === "manager")) {
    next();
  } else {
    res.status(403).json({message:"you are not authorized to access this resource"});
  }
  next();
}  

// get request to the homepage
app.get("/", (req, res) => {
  res.send('hello world from from Kevin');
});

// get request to the sales page
app.get("/sales", isDirectorOrManager, (req, res) => {
  res.json(sale.getAllSales());
});

app.get("/sales/:item",isDirectorOrManager, (req, res) => {
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