import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();


routes.route("/").get(protect, getTodos).post(protect, addTodo);
routes.route("/:id").delete(deleteTodo).get(getTodo).patch(updateTodo);

export default routes;
