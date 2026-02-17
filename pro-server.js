const express = require ("express");
const { Procurement } = require("./proc.js");

const procurement = new Procurement();
const app = express();

// middleware
app.use(express.json());

// get request to the homepage
app.get("/", (req, res) => {
  res.send("These are the procurement items");
});

// get request to the procurement page
app.get("/procurements", (req, res) => {
  res.json(procurement.getProcurements());
});

// post request to the procurement page
app.post("/procurements", async (req, res) => {
  let body = req.body;
  let saveState = await procurement.add(body);
  if(saveState) {
    res.status(201).json({message: "Procurement added successfully"});
  } else {
    res.status(400).json({message: "Failed to add procurement"});
  }
});

app.listen(3000, (err) => {
  if(err) {
    console.log("error");
  } else {
    console.log("server is successfully running on port 3000");
  }
})