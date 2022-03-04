const asyncHandler = require("express-async-handler");
const db = require("../db/index");

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  const { offset } = req.body || 0;
  console.log(offset);

  const recentResult = await db.query(
    "SELECT * FROM questions ORDER BY created_on DESC OFFSET $1 FETCH FIRST 5 ROW ONLY",
    [offset]
  );
  const hotResult = await db.query(
    "SELECT * FROM questions ORDER BY likes DESC OFFSET FETCH FIRST 5 ROW ONLY",
    [offset]
  );
  const recentQuestions = recentResult.rows;
  const hotQuestions = hotResult.rows;

  if (recentQuestions.length === 0 || hotQuestions.length) return res.json([]);

  res.status(200).json({ recentQuestions, hotQuestions });
});

// @desc    Get all user questions
// @route   GET /api/questions/:userId
// @access  Private
const getUserQuestions = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
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

// @desc    Get question
// @route   GET /api/questions/:id
// @access  Private
const getQuestion = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query(
    "select question_id, users.user_id, text, likes, dislikes, questions.created_on, name from questions left join users on questions.user_id = users.user_id WHERE question_id=$1",
    [req.params.id]
  );

  const question = qResult.rows[0];
  console.log(question);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
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
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
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
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if question exists
  const qResult = await db.query(
    "SELECT * FROM questions WHERE question_id=$1",
    [req.params.id]
  );

  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  // Check if user is authorized
  if (question.user_id.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const result = await db.query("DELETE FROM questions WHERE question_id=$1", [
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
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query(
    "SELECT * FROM questions WHERE question_id=$1",
    [req.params.id]
  );
  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.user_id.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const qUpdated = await db.query(
    "UPDATE questions SET text = $1 WHERE question_id = $2 returning *",
    [text, req.params.id]
  );

  const updatedQuestion = qUpdates.rows[0];

  res.status(200).json(updatedQuestion);
});

// @desc    Set like
// @route   PATCH /api/questions/:id/like
// @access  Private
const setLike = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query(
    "SELECT * FROM questions WHERE question_id=$1",
    [req.params.id]
  );
  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  const result = await db.query(
    "UPDATE questions SET likes = likes+1 WHERE question_id = $1 returning *",
    [req.params.id]
  );

  res.status(200).json(result.rows[0]);
});

// @desc    Set dislike
// @route   PATCH /api/questions/:id/like
// @access  Private
const setDislike = asyncHandler(async (req, res) => {
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);
  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const qResult = await db.query(
    "SELECT * FROM questions WHERE question_id=$1",
    [req.params.id]
  );
  const question = qResult.rows[0];

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  const result = await db.query(
    "UPDATE questions SET dislikes = dislikes+1 WHERE question_id = $1 returning *",
    [req.params.id]
  );

  res.status(200).json(result.rows[0]);
});

// @desc    Get 20 questions ordered by creation date
// @route   GET /api/questions/recent
// @access  Private
const getRecentQuestions = asyncHandler(async (req, res) => {
  const { offset } = req.body || 0;
  console.log(offset);

  const qResult = await db.query(
    "SELECT * FROM questions ORDER BY created_on DESC OFFSET $1 FETCH FIRST 5 ROW ONLY",
    [offset]
  );
  const questions = qResult.rows;

  if (questions.length === 0) return res.json([]);

  res.status(200).json(questions);
});

// @desc    Get questions ordered by creation date
// @route   GET /api/questions/hot
// @access  Private
const getHotQuestions = asyncHandler(async (req, res) => {
  const { offset } = req.body || 0;
  console.log(offset);

  const qResult = await db.query(
    "SELECT * FROM questions ORDER BY likes DESC OFFSET $1 FETCH FIRST 5 ROW ONLY",
    [offset]
  );
  const questions = qResult.rows;

  if (questions.length === 0) return res.json([]);

  res.status(200).json(questions);
});

module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getUserQuestions,
  getRecentQuestions,
  setLike,
  setDislike,
  getHotQuestions,
};
