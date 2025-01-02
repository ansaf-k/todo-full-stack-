import express from "express";
import connectDb from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";

connectDb();
const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
