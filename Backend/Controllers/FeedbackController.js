const asyncHandler = require("express-async-handler");
const Feedback = require("../models/FeedbackModel");
const User = require("../models/userModel")
//@desc Get all contacts
//@route GET /api/feedback
//@access private
const getFeedback = asyncHandler(async (req, res) => {
    const feedback = await Feedback.find({ user_id: req.user.id });
    res.status(200).json(feedback);
});

//@desc Create New contact
//@route POST /api/feedback
//@access private
const createFeedback = asyncHandler(async (req, res) => {
    const { email, category, feedback } = req.body;
    if(category === "Product Features" || category === "Product Pricing" || category === "Product Usability"){
        console.log("The request body is :", req.body);
    }
    else{
        res.status(400)
        throw new Error("category should be only out of three");
    }
    const newfeedback =  await Feedback.create({
        user_id : req.user.id,
        email,
        category,
        feedback
    });
    if(newfeedback){
        res.status(200).json(newfeedback);
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc Get feedback by category
//@route GET /api/feedback:id
//@access private
const getFeedbackbyCategory= asyncHandler(async (req, res) => {
    const feedback = await Feedback.find({"category":req.params.id});
    if (!feedback) {
        res.status(404);
        throw new Error("no feedback found with this category");
    }
    res.status(200).json(feedback);
});



module.exports = {
    createFeedback,
    getFeedbackbyCategory
};
