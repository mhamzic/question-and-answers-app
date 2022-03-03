const express = require("express");
const router = express.Router();
const {
  getQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  setLike,
  setDislike,
  getUserQuestions,
  getRecentQuestions,
  getHotQuestions,
} = require("../controllers/questionController");

const { protect } = require("../middleware/authMiddleware");

// Re-route into note router
const answerRouter = require("./answerRoutes");
router.use("/:questionId/notes", answerRouter);

router.route("/").get(protect, getQuestions).post(protect, createQuestion);

router.route("/user").get(protect, getUserQuestions);
router.route("/recent").post(protect, getRecentQuestions);
router.route("/hot").post(protect, getHotQuestions);

router.route("/:id/like").patch(protect, setLike);
router.route("/:id/dislike").patch(protect, setDislike);

router
  .route("/:id")
  .get(protect, getQuestion)
  .delete(protect, deleteQuestion)
  .put(protect, updateQuestion);

module.exports = router;
