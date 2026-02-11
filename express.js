const express = require('express');
const {teamworkModel} = require('./mongo');

const app = express();

app.use(express.json());

app.get('/credit_sales', async (req, res) => {
  try {
    let data = await teamworkModel.find({ isCredit: true });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: `an error occurred: ${err}` });
  }
});

app.post('/credit_sales', async (req, res) => {
  try {
    let body = req.body;
    let data = new teamworkModel(body);
    await data.save()
    .then(() => {
      console.log('Data saved successfully');
      res.status(200).json({ message: 'Data saved successfully' });
    })
    .catch(err => {
      console.error('Error saving data:', err);
    });
    ;
  } catch (err) {
    res.status(500).json({ message: `an error occurred: ${err}` });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});