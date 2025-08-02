// src/App.jsx
import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Jobs from './pages/Jobs';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetails from './pages/JobDetails';
import Apply from './pages/Apply';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

import AdminDashboard from './pages/admin/Dashboard';
import AddJob from './pages/admin/AddJob';
import ViewApplications from './pages/admin/ViewApplications';

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/admin" element={<PrivateRoute requiredRole="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/add-job" element={<PrivateRoute requiredRole="admin"><AddJob /></PrivateRoute>} />
          <Route path="/admin/applications" element={<PrivateRoute requiredRole="admin"><ViewApplications /></PrivateRoute>} />

          <Route path="*" element={<div className="text-center text-2xl font-semibold p-8">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
