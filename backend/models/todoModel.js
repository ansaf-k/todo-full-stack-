import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    required: true,
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
