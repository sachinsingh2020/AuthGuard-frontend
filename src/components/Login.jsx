import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/user';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error, isAuthenticated } = useSelector((state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            toast.error('Please fill all the fields');
            return;
        }
        await dispatch(login(email, password));
    };

    // Handle authentication state and notifications
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirect to Home
        }
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, message, error, isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-900">
            <div className="bg-blue-700 p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-white text-3xl font-semibold mb-6 text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-white text-sm mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-white text-sm mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-blue-300 mt-4">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
