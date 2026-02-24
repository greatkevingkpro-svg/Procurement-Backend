const assert = require("assert");
const { test, describe } = require("node:test");
const { sumOfSales } = require("../utils/index.js")

const actual = 1 + 1;
const expected = 2;

let sales = [
  { amount: 100, customerName: "John Doe", date: new Date(), currency: "USD" },
  { amount: 200, customerName: "Jane Doe", date: new Date(), currency: "USD" },
  { amount: 300, customerName: "Jim Doe", date: new Date(), currency: "USD" },
];

describe("Addition", () => {
  test("should return the correct sum of two numbers", () => { 
    assert.strictEqual(actual, expected, "The actual value does not match the expected value");
  })
})


describe("Tonnage validation", () => {
  test("should return false for tonnage less than or equal to 1000", () => {
    assert.strictEqual(validateTonnage(1000), false, "The tonnage should be invalid");
  });
})

describe("salesSummation", () => {
  test("sum up sale objects", () => {
    assert.strictEqual(sumOfSales(sales), 600, "The sum of sales should be 600");
  })
})

/**
 * @param {number}tons 
 * @returns {boolean} 
 */
function validateTonnage(tons) {
  return tons > 1000 //&& tons <= 1000;
}

assert.notEqual(validateTonnage(1000), true, "The tonnage should be valid");
assert.strictEqual(validateTonnage(1001), true, "The tonnage should be valid");
