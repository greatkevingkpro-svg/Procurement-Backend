const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/kgl';

mongoose.connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  })

let salesSchema = new mongoose.Schema({
  amount: Number,
  customerName: String,
  date: Date,
  currency: String
})

let salesModel = mongoose.model('sales', salesSchema);

// module.exports = { salesModel };
let sales = new salesModel({
  amount: 500000,
  customerName: "John",
  date: new Date(),
  currency: "UGX"
});

sales.save()
  .then(() => {
    console.log('Saved Successfully');
  })
  .catch((err) => {
    console.log(err);
  })