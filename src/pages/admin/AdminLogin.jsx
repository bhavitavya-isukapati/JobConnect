import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (res.data.role !== 'admin') {
        setError('Access denied: Not an admin');
        return;
      }
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required className="mb-3 w-full border px-3 py-2 rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="mb-4 w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
