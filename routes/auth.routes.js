const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validation/auth.validator");

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../services/auth.service");

const router = express.Router();

router.post("/signup", signupValidator, signup); //checked
router.post("/login", loginValidator, login); //checked
router.post("/forgotPassword", forgotPassword); // checked
router.post("/verifyResetCode", verifyPassResetCode); // checked
router.put("/resetPassword", resetPassword); // checked

module.exports = router;
