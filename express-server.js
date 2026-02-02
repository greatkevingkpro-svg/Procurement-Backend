const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send("Hello World! from kevin");
});

app.get("/sales", (req, res) => {
  
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log("Server is running successfully on port 3000"); 
  }
})