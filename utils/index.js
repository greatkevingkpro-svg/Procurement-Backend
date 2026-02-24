
/**
 * 
 * @param {object[]} sales 
 * @returns {number} the total amount of all sales
 */
function sumOfSales(sales) {
  return sales.reduce((acc, curr) => acc + curr.amount, 0);
}


// console.log(sales);
// console.log(sumOfSales(sales)); // should print 600

module.exports = { sumOfSales }