const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getAllProductsAdmin,
} = require("../Controllers/productController");
const { isAuthenticate, isAuthorizeRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticate, isAuthorizeRoles("admin"), getAllProductsAdmin);
router
  .route("/admin/product/new")
  .post(isAuthenticate, isAuthorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticate, isAuthorizeRoles("admin"), updateProduct)
  .delete(isAuthenticate, isAuthorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getOneProduct);
router.route("/review").put(isAuthenticate, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticate, deleteReviews);

module.exports = router;
