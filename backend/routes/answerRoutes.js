const express = require('express')
const router = express.Router({ mergeParams: true })
const { getAnswers, addAnswer } = require('../controllers/answerController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAnswers).post(protect, addAnswer)

module.exports = router
