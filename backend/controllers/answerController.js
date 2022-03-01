const asyncHandler = require("express-async-handler");
const db = require("../db/index");

// @desc    Get answers for a question
// @route   GET /api/questions/:questionId/answers
// @access  Private
const getAnswers = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const { id } = req.user.id;
  const results = await db.query(
    "SELECT * FROM users WHERE id = $1 returning *",
    [id]
  );
  const user = results.rows[0];

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const question = await Ticket.findById(req.params.questionId);

  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const answers = await Answer.find({ question: req.params.questionId });

  res.status(200).json(answers);
});

// @desc    Create question answer
// @route   POST /api/questions/:questionId/answers
// @access  Private
const addAnswer = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const question = await Ticket.findById(req.params.questionId);

  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const answer = await Answer.create({
    text: req.body.text,
    isStaff: false,
    question: req.params.questionId,
    user: req.user.id,
  });

  res.status(200).json(answer);
});

module.exports = {
  getAnswers,
  addAnswer,
};
