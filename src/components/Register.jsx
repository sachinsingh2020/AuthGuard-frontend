import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/user';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error, isAuthenticated } = useSelector((state) => state.user);

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Automatically add +91 if not present in the phone number
        if (name === 'phoneNumber' && !value.startsWith('+91')) {
            value = `+91${value}`;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!formData.fullName) {
            toast.error('Full Name is required.');
            return false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Enter a valid email address.');
            return false;
        }
        if (!formData.dateOfBirth || !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateOfBirth)) {
            toast.error('Enter Date of Birth in DD/MM/YYYY format.');
            return false;
        }
        if (!formData.phoneNumber || !/^(\+91)?\d{10}$/.test(formData.phoneNumber)) {
            toast.error('Enter a valid 10-digit phone number.');
            return false;
        }
        if (!formData.password) {
            toast.error('Password is required.');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Remove confirmPassword from formData
            const { confirmPassword, ...finalData } = formData;

            // Dispatch the sanitized data
            await dispatch(register(finalData));
        }
    };

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
                <h1 className="text-white text-3xl font-semibold mb-6 text-center">Create Account</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="dateOfBirth"
                        placeholder="Date of Birth (DD/MM/YYYY)"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number (10 digits)"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <Link to="/login" className="text-blue-300 hover:underline mb-4 block">
                        Already have an account? <span className="text-blue-400">Login</span>
                    </Link>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
