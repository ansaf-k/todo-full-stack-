import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useAddTodoMutation } from "../slices/todoApiSlice";

const AddTodo = ({ getTodos }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const [addTodo, {isLoading}] = useAddTodoMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    await addTodo({ title, desc });

    // setIsLoading(true);
    // await axios.post("/api/todo", { title, desc });
    // setIsLoading(false);
    // getTodos();
    setDesc("");
    setTitle("");
    toast.success("added successfully");
  };

  return (
    <div>
      <form className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200" onSubmit={submitHandler}>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add a New Todo
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Todo Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Todo Description"
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            {isLoading ? <Loader /> : 'Add Todo'}
          </button>
        </div>
      </form>
    </div >
  )
}

export default AddTodo