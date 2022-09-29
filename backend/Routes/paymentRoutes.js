const express = require("express");
const {
  processPayment,
  sendStripeKey,
} = require("../Controllers/PaymentController");
const router = express.Router();
const { isAuthenticate } = require("../Middleware/auth");

router.route("/cart/payment").post(isAuthenticate, processPayment);
router.route("/stripeapikey").get(isAuthenticate, sendStripeKey);

module.exports = router;
