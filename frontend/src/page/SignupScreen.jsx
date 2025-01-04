import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../slices/userSlice";

const SignUpScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [registerUser] = useRegisterUserMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("first");
        try {
            await registerUser({ name, email, password }).unwrap();
            setName("");
            setEmail("");
            setPassword("");
            toast.success("successfully registered");
            navigate("/");
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    To-Do App
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    Create your account to get started
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Name Input */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300 focus:outline-none"
                        />
                    </div>

                    {/* Email Input */}
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

                    {/* Password Input */}
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
                            placeholder="Create a password"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Redirect */}
                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-teal-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpScreen;