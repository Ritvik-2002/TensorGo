const express = require('express');
const {getFeedbackbyCategory,createFeedback } = require('../Controllers/FeedbackController');
const router = express.Router();
const validateToken = require("../middleware/validateToken");
// router.use(validateToken);
// router.route("/").get(getFeedback);
router.post("/create",validateToken,createFeedback);
router.route("/getfeedback/:id").get(getFeedbackbyCategory);
module.exports = router;