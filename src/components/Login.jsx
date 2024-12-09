import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/user";
import toast from "react-hot-toast";
import loginPageImage from "../assets/loginPageImage.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email.trim() === "" || password.trim() === "") {
            toast.error("Please fill all the fields");
            return;
        }
        await dispatch(login(email, password));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); // Redirect to Home
        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, message, error, isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            {/* Left Section - Image */}
            <div className="hidden lg:block w-full lg:w-3/4 h-screen">
                <img
                    src={loginPageImage}
                    alt="Login Graphic"
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Right Section - Login Form */}
            <div className="flex w-full lg:w-1/4 items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6">
                        Login
                    </h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#013421] text-white p-3 rounded-md hover:bg-green-800 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#f98b03] font-medium hover:underline"
                        >
                            Sign up for free.
                        </Link>
                    </p>
                </div>
            </div>
        </div>


    );
};

export default Login;
