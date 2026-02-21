const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/kgl-database";
mongoose.connect(URI)
  .then(() => {
    console.log("connected to the mongodb database");
  })
  .catch((err) => {
    console.log(err);
  });

let salesSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
});

let saleModel = mongoose.model("sales", salesSchema);


let creditSalesSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  amountDue: {
    type: Number,
    required: true
  },
  nationalID: {
    type: String,
    required: true
  },
});

let creditSalesModel = mongoose.model("credit-sales", creditSalesSchema);

module.exports = { saleModel, creditSalesModel };
