const asyncHandler = require("express-async-handler");
const db = require("../db/index");

// @desc    Get answers for a question
// @route   GET /api/questions/:questionId/answers
// @access  Private
const getAnswers = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const { id } = req.user.id;

  const aResult = await db.query(
    "select answers.created_on, answers.text, users.name, answers.user_id, answers.answer_id, answers.likes, answers.dislikes from answers LEFT JOIN users ON answers.user_id = users.user_id WHERE question_id=$1",
    [req.params.questionId]
  );

  const answers = aResult.rows;
  // console.log(aResult);
  res.status(200).json(answers);
});

// @desc    Create answer for given question
// @route   POST /api/questions/:questionId/answers
// @access  Private
const addAnswer = asyncHandler(async (req, res) => {
  const { text, question_id } = req.body;

  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);

  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const answerResult = await db.query(
    "INSERT INTO answers (text, user_id, question_id) VALUES ($1, $2, $3) returning *",
    [text, req.user.id, question_id]
  );

  const answer = answerResult.rows[0];

  res.status(200).json(answer);
});

// return users with most answers, limited to top 5
const getTopAnswers = asyncHandler(async (req, res) => {
  const answerResult = await db.query(
    "select answers.user_id, name, count(answers.user_id) from answers left join users on answers.user_id=users.user_id group by answers.user_id, name order by count desc limit 5"
  );
  const answers = answerResult.rows;
  res.status(200).json(answers);
});

// @desc    Get single answer
// @route   GET /api/answers/:id
// @access  Private
const getAnswer = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);

  const user = uResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const aResult = await db.query("SELECT * FROM answers WHERE answer_id = $1", [
    req.params.id,
  ]);

  res.status(200).json(aResult.rows[0]);
});

// @desc    Update single answer
// @route   GET /api/answers/:id
// @access  Private
const updateAnswer = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const { text } = req.body;
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);

  const aResult = await db.query("SELECT * FROM answers WHERE answer_id=$1", [
    req.params.id,
  ]);

  const user = uResult.rows[0];
  const answer = aResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (answer.user_id.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const aUpdated = await db.query(
    "UPDATE answers SET text = $1 WHERE answer_id = $2 returning *",
    [text, req.params.id]
  );

  res.status(200).json(aUpdated.rows[0]);
});

// @desc    Remove single answer
// @route   GET /api/answers/:id
// @access  Private
const removeAnswer = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const uResult = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.id,
  ]);

  const aResult = await db.query("SELECT * FROM answers WHERE answer_id=$1", [
    req.params.id,
  ]);

  const user = uResult.rows[0];
  const answer = aResult.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (answer.user_id.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const aUpdated = await db.query("DELETE FROM answers WHERE answer_id = $1", [
    req.params.id,
  ]);

  res.status(200).json({ success: true });
});

// @desc    Set like
// @route   PATCH /api/answers/:id/like
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

  const qResult = await db.query("SELECT * FROM answers WHERE answer_id=$1", [
    req.params.id,
  ]);
  const answer = qResult.rows[0];

  if (!answer) {
    res.status(404);
    throw new Error("Answer not found");
  }

  const result = await db.query(
    "UPDATE answers SET likes = likes+1 WHERE answer_id = $1",
    [req.params.id]
  );

  res.status(200).json(result.rows[0]);
});

// @desc    Set dislike
// @route   PATCH /api/answers/:id/like
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

  const qResult = await db.query("SELECT * FROM answers WHERE answer_id=$1", [
    req.params.id,
  ]);
  const answer = qResult.rows[0];

  if (!answer) {
    res.status(404);
    throw new Error("Answer not found");
  }

  const result = await db.query(
    "UPDATE answers SET dislikes = dislikes+1 WHERE answer_id = $1 returning *",
    [req.params.id]
  );

  res.status(200).json(result.rows[0]);
});

module.exports = {
  getAnswers,
  getAnswer,
  addAnswer,
  getTopAnswers,
  setLike,
  setDislike,
  updateAnswer,
  removeAnswer,
};
