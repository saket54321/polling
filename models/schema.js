const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{
    text: { type: String, },
    votes: { type: Number, default: 0 }
  }]
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;