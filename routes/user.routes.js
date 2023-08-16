const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validation/user.vaildatoin");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../services/user.service");

const authService = require("../services/auth.service");

const router = express.Router();

router.use(authService.protect);

router.get("/getMe", getLoggedUserData, getUser); // cheked
router.put("/changeMyPassword", updateLoggedUserPassword); // cheked
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData); // cheked
router.delete("/deleteMe", deleteLoggedUserData); // cheked

// Admin
router.use(authService.allowedTo("admin", "manager"));
router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);
router
  .route("/")
  .get(getUsers) // cheked
  .post(uploadUserImage, resizeImage, createUserValidator, createUser); // cheked
router
  .route("/:id")
  .get(getUserValidator, getUser) // cheked
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser) // cheked
  .delete(deleteUserValidator, deleteUser); // cheked

module.exports = router;
