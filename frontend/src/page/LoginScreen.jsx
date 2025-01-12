import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUserMutation } from "../slices/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setcredentials } from "../slices/authSlice";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth)

  const [login] = useAuthUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setcredentials(res));
      setEmail("");
      setPassword("");
      navigate("/homepage");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/homepage")
    }
  }, [userInfo, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          To-Do App
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Manage your tasks effortlessly
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/" className="text-teal-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
