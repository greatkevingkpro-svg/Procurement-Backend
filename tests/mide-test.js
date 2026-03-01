const assert = require("node:assert");
const { test, describe } = require("node:test");

function checkAuth(role) {
  if (role !== "admin") {
    return 404;
  }

  return 200;
}

describe("auth failure test", () => {
  test("input role: 'sales agent' - assert returns 404 status", () => {
    const role = "sales agent";
    const expectedStatus = 404;

    assert.strictEqual(
      checkAuth(role),
      expectedStatus,
      "the status should be 404 for the sales agent",
    );
  });

  test("input role: 'admin' - assert returns 200 status", () => {
    const role = "admin";
    const expectedStatus = 200;

    assert.strictEqual(
      checkAuth(role),
      expectedStatus,
      "the status should be 200 for the admin",
    );
  });
});