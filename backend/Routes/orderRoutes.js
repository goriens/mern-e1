const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controllers/OrderController");
const { isAuthenticate, isAuthorizeRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticate, newOrder);
router.route("/order/:id").get(isAuthenticate, getSingleOrder);
router.route("/orders/me").get(isAuthenticate, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticate, isAuthorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticate, isAuthorizeRoles("admin"), updateOrder)
  .delete(isAuthenticate, isAuthorizeRoles("admin"), deleteOrder);

module.exports = router;
