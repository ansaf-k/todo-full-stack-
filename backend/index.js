import express from "express";
import connectDb from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/todo", todoRoutes);
app.use("/api/users", userRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log("hello");
