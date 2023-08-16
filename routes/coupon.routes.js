const express = require("express");

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../services/coupon.service");

const authService = require("../services/auth.service");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("admin", "manager"));

router.route("/").get(getCoupons).post(createCoupon); //chked
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon); //chked

module.exports = router;
