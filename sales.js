const fs = require('fs/promises');

class Sale {
  constructor(path= "data.json") {
    this.path = path;
    this.sales = [];

    fs.readFile(this.path) 
      .then((data, err) => {
        if (err) {
          console.log()
        }
      })

    

  }
}