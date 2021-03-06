const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db/index");

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user already exists
  const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length !== 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const result = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning *",
    [name, email, hashedPassword]
  );

  const user = result.rows[0];

  if (user) {
    res.status(201).json({
      // _id: user.id,
      // name: user.name,
      // email: user.email,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      // _id: user.id,
      // name: user.name,
      // email: user.email,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const result = await db.query(
    "SELECT name, email FROM users WHERE user_id = $1",
    [req.user.id]
  );
  const user = result.rows[0];
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

// @desc    Edit current user
// @route   /api/users/me
// @access  Private
const editUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updatedUser = await db.query(
    "UPDATE users SET name = $1, email = $2 WHERE user_id=$3 returning *",
    [req.body.name, req.body.email, req.user.id]
  );

  res.status(200).json(updatedUser.rows[0]);
});

// @desc    Change current user
// @route   /api/users/me/password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  let isValidPassword = await bcrypt.compare(
    req.body.oldpassword,
    user.password
  );

  if (!isValidPassword) {
    res.status(401);
    throw new Error("Invalid credentials, check you password.");
  }

  let hashedPassword = await bcrypt.hash(req.body.newpassword, 10);

  const updatedUser = await db.query(
    "UPDATE users SET password=$1 WHERE user_id=$2",
    [hashedPassword, req.user.id]
  );

  res.status(200).json({ status: "success" });
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  editUser,
  changePassword,
};
