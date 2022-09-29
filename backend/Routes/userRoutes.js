const express = require("express");
const { isAuthenticate, isAuthorizeRoles } = require("../Middleware/auth");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRoles,
  deleteUser,
} = require("../Controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticate, getUserDetails);
router.route("/password/update").put(isAuthenticate, updatePassword);
router.route("/me/update").put(isAuthenticate, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticate, isAuthorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticate, isAuthorizeRoles("admin"), getSingleUser)
  .put(isAuthenticate, isAuthorizeRoles("admin"), updateUserRoles)
  .delete(isAuthenticate, isAuthorizeRoles("admin"), deleteUser);

module.exports = router;
