const express = require("express");
const router = express.Router();
// Import controller methods
const {
  loginUser,
  getAllUsers,
  register,
  updateProfile,
  updateUser,
  updatePassword,
  getUserById,
  getUserByEmail,
  deleteUser,
  blockUser,
} = require("../controllers/UserController");

router.put("/login", loginUser);
router.get("/users", getAllUsers);
router.post("/register", register);
router.put("/updateProfile", updateProfile);
router.put("/updateUser", updateUser);
router.put("/changePassword", updatePassword);
router.get("/getUserById", getUserById);
router.get("/getUserByEmail", getUserByEmail);
router.delete("/deleteUser/:id", deleteUser);
router.put("/blockUser", blockUser);
module.exports = router;
