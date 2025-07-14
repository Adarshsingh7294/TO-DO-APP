// 
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // removes extra white spaces from both ends
    },
    isCompleted: {
      type: Boolean,
      default: false, // false = pending, true = completed
    },
  },
  { timestamps: true } // auto adds createdAt and updatedAt
);

const todoModel = mongoose.model("todos", todoSchema);

module.exports = todoModel;
