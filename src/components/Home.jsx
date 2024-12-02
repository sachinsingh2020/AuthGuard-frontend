import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/user'; // Import your logout action

const Home = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
    };

    const { user } = useSelector((state) => state.user);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900">
            <h1
                className='text-[#dc3545] text-4xl mb-6 font-bold bg-white border-4 border-[#dc3545] p-4 rounded-lg'

            >Hello {user.fullName}, How are you</h1>
            <h1 className="text-white text-2xl mb-6">This is the Home Page</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default Home;
