import asyncHandler from "../middlewares/asyncHandler.js";
import Todo from "../models/todoModel.js";

const addTodo = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  const todo = await Todo.create({
    title,
    desc,
    user: req.user._id,
  });

  res.json(todo);
});

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });

  res.json(todos);
});

const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  res.json(todo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete(id);

  res.send("deleted successfully");
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, desc, status } = req.body;

  const todo = await Todo.findById(id);

  todo.title = title || todo.title;
  todo.desc = desc || todo.desc;
  todo.status = status || todo.status;

  const updatedTodo = await todo.save();

  res.json(updatedTodo);
});

export { addTodo, getTodos, deleteTodo, getTodo, updateTodo };