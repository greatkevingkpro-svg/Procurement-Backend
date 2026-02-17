const fs = require("fs/promises");

class Sale {

  constructor(path="sales.json") {
    this.path = path;
    this.sales = [];

    fs.readFile(this.path)
      .then((data, err) => {
        if(err) {
          console.log(err);
        } else {
          this.sales = JSON.parse(data);
          // console.log(this.sales);
        }
      })
  }
  // method to get all sales
  getAllSales() {
    return this.sales
  }

  // get sales by item
  getSaleByItem(item) {
    return this.sales.find(sale => sale.item === item);
  }

  // add a new sale
  async add(sale) {
    this.sales.push(sale);
    return await this.save();
  }

  // save the sales to the file
  async save() {
    let isSavedSuccessful
    await fs.writeFile(this.path, JSON.stringify(this.sales))
      .then(err => {
        if(err) {
          isSavedSuccessful = false;
        } else { 
          isSavedSuccessful = true;
        }
      })

    return isSavedSuccessful;
  }
}

module.exports = {Sale};