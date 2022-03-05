const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAnswers,
  addAnswer,
  getTopAnswers,
  setLike,
  setDislike,
  getAnswer,
  updateAnswer,
  removeAnswer,
} = require("../controllers/answerController");

const { protect } = require("../middleware/authMiddleware");

router.route("/:id/like").patch(protect, setLike);
router.route("/:id/dislike").patch(protect, setDislike);

router.route("/").get(protect, getAnswers).post(protect, addAnswer);
router.route("/topanswers").get(getTopAnswers);
router.route("/question/:questionId").get(protect, getAnswers);
router
  .route("/:id")
  .get(protect, getAnswer)
  .put(protect, updateAnswer)
  .delete(protect, removeAnswer);

module.exports = router;
