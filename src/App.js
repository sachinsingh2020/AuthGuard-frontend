import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { isUserLoggedIn } from './redux/actions/user';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Check authentication status on app load
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Redirect to Home if authenticated */}
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        {/* Redirect to Login if not authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
