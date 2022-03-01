const asyncHandler = require("express-async-handler");
const db = require("../db/index");

// @desc    Get user questions
// @route   GET /api/questions
// @access  Private
const getQuestions = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE id = $1", [
    req.user.id,
  ]);

  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query("SELECT * FROM questions WHERE user_id=$1", [
    req.user.id,
  ]);
  const questions = qResult.rows;

  res.status(200).json(questions);
});

// @desc    Get user question
// @route   GET /api/questions/:id
// @access  Private
const getQuestion = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query("SELECT * FROM questions WHERE id=$1", [
    req.params.id,
  ]);

  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  // Check if user is authorized
  if (question.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(question);
});

// @desc    Create new question
// @route   POST /api/questions
// @access  Private
const createQuestion = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please add a text");
  }

  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const result = await db.query(
    "INSERT INTO questions (text, user_id) VALUES ($1, $2) returning *",
    [text, req.user.id]
  );

  const question = result.rows[0];

  res.status(201).json(question);
});

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private
const deleteQuestion = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if question exists
  const qResult = await db.query("SELECT * FROM questions WHERE user_id=$1", [
    req.params.id,
  ]);

  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  // Check if user is authorized
  if (question.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const result = await db.query("DELETE FROM questions WHERE id=$1", [
    req.params.id,
  ]);

  res.status(200).json({ success: true });
});

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private
const updateQuestion = asyncHandler(async (req, res) => {
  const { text } = req.body;
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query("SELECT * FROM questions WHERE user_id=$1", [
    req.params.id,
  ]);
  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const result = await db.query(
    "UPDATE questions SET text = $1 WHERE id = $2 returning *",
    [text, req.params.id]
  );

  // const updatedQuestion = await Question.findByIdAndUpdate(
  //   req.params.id,
  //   req.body,
  //   { new: true }
  // );

  res.status(200).json(updatedQuestion);
});

// @desc    Set like
// @route   PATCH /api/questions/:id/like
// @access  Private
const setLike = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query("SELECT * FROM questions WHERE id=$1", [
    req.params.id,
  ]);
  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const result = await db.query(
    "UPDATE questions SET likes = likes+1 WHERE id = $1 returning *",
    [req.params.id]
  );

  // const updatedQuestion = await Question.findByIdAndUpdate(
  //   req.params.id,
  //   req.body,
  //   { new: true }
  // );

  res.status(200).json(result.rows[0]);
});

const setDislike = asyncHandler(async (req, res) => {});

module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  setLike,
  setDislike,
};
