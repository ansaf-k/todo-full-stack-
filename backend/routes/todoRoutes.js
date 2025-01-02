import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoControllers.js";

const routes = express.Router();

// routes.post("/", addTodo);
// routes.get("/", getTodos);

routes.route("/").get(getTodos).post(addTodo);
routes.route("/:id").delete(deleteTodo).get(getTodo).patch(updateTodo);

export default routes;
