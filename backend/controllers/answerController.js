const asyncHandler = require("express-async-handler");
const db = require("../db/index");

// @desc    Get answers for a question
// @route   GET /api/questions/:questionId/answers
// @access  Private
const getAnswers = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const { id } = req.user.id;
  // const aResult = await db.query("select * from answers WHERE question_id=$1", [
  //   req.params.questionId,
  // ]);

  const aResult = await db.query(
    "select answers.created_on, answers.text, users.name from answers LEFT JOIN users ON answers.user_id = users.user_id WHERE question_id=$1",
    [req.params.questionId]
  );

  const answers = aResult.rows;
  console.log(aResult);
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
