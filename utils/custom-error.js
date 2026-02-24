/**
 * Custom error class to handle errors in the application
 * It extends the built-in Error class and adds additional properties
 * such as status code and reason for the error
 */

class KGLError extends Error{

  /**
   * constructor to initialize the error with
   * message, status code and reason for the error
   * @param {string} message 
   * @param {number} statusCode 
   * @param {string} reason 
   */
  constructor(message, statusCode, reason="") {
    super(message);
    this.statusCode = statusCode;
    this.reason = reason;
  }
}

module.exports = {KGLError}