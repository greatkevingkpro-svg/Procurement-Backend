const assert = require("node:assert");
const { test, describe } = require("node:test");
const { isNotSalesManager, isAdmin } = require("../middleware/index.js");
const { json } = require("node:stream/consumers");

describe("testing isNotSalesManager and isAdmin middleware", () => {
  test("testing sales manager is not allowed", () => {
    const req = { user: { role: "sales-manger" } };

    const res = {
      status: () => ({
        json: () => false
      })
    };

    const next = () => true;

    assert.strictEqual(isNotSalesManager(req, res, next), true, "The sales manager is not authorised to access this resource")
  })

  test("testing manager", () => {
    const req = {
      user: {
        role: "manager"
      }
    }

    const res = {
      status: () => {
        return {
          json: () => {
            return {
              message: "You are not authorised to access this resource"
            }
          }
        }
      }
    }

    const next = () => {
      return true
    }

    assert.strictEqual(isNotSalesManager(req, res, next), true, "The sales manager is authorised to access this resource")
  })



  test("admin should access", () => {
    const req = { user: { role: "admin" } };

    const res = {
      status: () => ({
        json: () => false
      })
    };

    const next = () => true;

    assert.strictEqual(isAdmin(req, res, next), true);
  });

  test("non-admin should not access", () => {
    const req = { user: { role: "manager" } };

    const res = {
      status: () => ({
        json: () => false
      })
    };

    const next = () => true;

    assert.strictEqual(isAdmin(req, res, next), false);
  });
})