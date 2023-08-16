class ApiError extends Error {
  constructor(messge, statusCode) {
    super(messge);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
  }
}
module.exports = ApiError;
