const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/kgl';

mongoose.connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err)
  })

// const mongodb = mongoose.connection;

let creditSalesSchema = new mongoose.Schema({
  buyerName: String,
  nationalID: String,
  amount: Number,
  required: true
})

let creditSalesModel = mongoose.model('creditSales', creditSalesSchema);

let sales = new creditSalesModel({
  amount: 500000,
  buyerName: "John",
  nationalID: "123456789",
  currency: "UGX"
});

sales.save()
  .then(() => {
    console.log('Saved Successfully');
  })
  .catch((err) => {
    console.log(err);
  })

// mongodb.on("open", () => {
//   console.log("the database is open");
//   const procurementCollection = mongodb.db.collection("procurement");
//   procurementCollection.find({})
//     .toArray()
//     .then((procurement) => {
//       console.log(procurement);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })