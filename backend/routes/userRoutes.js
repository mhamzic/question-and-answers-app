const express = require("express");
const { route } = require("express/lib/router");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  editUser,
  changePassword,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/me").get(protect, getMe).put(protect, editUser);
router.put("/me/password", protect, changePassword);

module.exports = router;
