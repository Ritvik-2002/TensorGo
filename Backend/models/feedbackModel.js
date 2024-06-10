const mongoose = require("mongoose");

const FeedBack = mongoose.Schema(
  {
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    category: {
      type: String,
      required: [true, "Please add the category"],
    },
    feedback:{
        type: String,
        required: [true, "Please add the feedback"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", FeedBack);
