import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // ✅ Correct way to get setUser

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      const { token, user, message } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user); // ✅ Set global state

      setMessage(message);
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f5f5f5] via-[#f0ede6] to-[#e8e6e3] px-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-2xl border border-[#ddd]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2E2E2E]">Welcome Back 👋</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Login to your JobConnect account</p>
        {error && <div className="text-red-600 mb-4 text-sm text-center">{error}</div>}
        {message && <div className="text-green-600 mb-4 text-sm text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#F9F7F1]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#F9F7F1]"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-[#5E8C6A] hover:bg-[#4C7458] text-white py-2 px-4 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-[#5E8C6A] font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
