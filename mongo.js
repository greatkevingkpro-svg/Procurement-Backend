const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/teamwork';

mongoose.connect(URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const teamworkSchema = new mongoose.Schema({
  name: String,
  isCredit: Boolean,
  amountDue: Number,
});

const teamworkModel = mongoose.model('credit_sales', teamworkSchema);

module.exports = { teamworkModel };