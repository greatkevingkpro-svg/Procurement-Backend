const fs = require("fs/promises");

class CreditSales {

  constructor(path="credit-sales.json") {
    this.path = path;
    this.CreditSales = [];

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
  // method to get all credit sales
  getAllCreditSales() {
    return this.CreditSales
  }

  // get sales by item
  // getSaleByItem(item) {
  //   return this.sales.find(sale => sale.item === item);
  // }

  // add a new credit sale
  async add(creditSale) {
    this.CreditSales.push(creditSale);
    return await this.save();
  }

  // save the sales to the file
  async save() {
    let isSavedSuccessful
    await fs.writeFile(this.path, JSON.stringify(this.CreditSales))
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

module.exports = {CreditSale};