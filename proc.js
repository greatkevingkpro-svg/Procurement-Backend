const fs = require("fs/promises");

class Procurement {

  constructor(path = "procurement.json") {
    this.path = path;
    this.procurements = [];

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

  getProcurements() {
    return this.procurements;
  }

  // add a new procurement
  async add(procurement) {
    this.procurements.push(procurement);
    return await this.save();
  }

  // save the procurements to the file
  async save() {
    let isAddedSuccessful;
    await fs.writeFile(this.path, JSON.stringify(this.procurements))
      .then(err => {
        if(err) {
          isAddedSuccessful = false;
        } else {
          isAddedSuccessful = true;
        }
      });

    return isAddedSuccessful;
  }
}

module.exports = { Procurement };