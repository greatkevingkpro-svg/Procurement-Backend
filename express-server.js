const express = require('express');
const { Sale } = require('./sales.js');
const { salesModel } = require('./mongoDB_server.js');

const sale = new Sale();
const app = express();
app.use(express.json());

// middleware
const userDetailsMiddleware = (req, res, next) => {
  const userDetailsString = req.get("User-details");
  if (!userDetailsString) {
    res.status(403);
    res.json({ message: "there is no user details" });
  }
  const userDetails = JSON.parse(userDetailsString);

  if (userDetails.role && userDetails.role.toLowerCase() === "admin") {
    req.user = userDetails;
    next();
  } else {
    res.status(403);
    res.json({ message: "User information is not found or is not an admin" });
  }
}

app.get('/', (req, res) => {
  res.send("Hello World! from kevin");
});

app.get("/sales", userDetailsMiddleware, (req, res) => {
  res.json(sale.getAllSales());
});

app.post("/sales", async (req, res) => {
  let body = req.body;

  try {
    let sales = new salesModel(body);

    sales.save()
      .then(() => {
        res.json({ message: "Saved Successfully", body});
        res.status(201);
      })
      .catch((err) => {
        console.log(err);
        res.json({ message: "Error saving sales", error: err.message });
        res.status(400);
      })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log("Server is running successfully on port 3000");
  }
})