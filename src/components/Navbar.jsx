// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { AuthContext } from '../App'; // ✅ Only import, don't declare again

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-md font-medium transition duration-200 ${
      location.pathname === path
        ? 'bg-[#2F855A] text-white'
        : 'text-[#2E2E2E] hover:bg-[#E6E6E6]'
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <div className="text-xl font-bold text-[#2E2E2E]">JobConnect</div>

      <div className="flex gap-4 items-center">
        <Link to="/" className={linkStyle('/')}>Home</Link>
        <Link to="/about" className={linkStyle('/about')}>About</Link>
        <Link to="/jobs" className={linkStyle('/jobs')}>Jobs</Link>

        {user?.role === 'admin' && (
          <Link to="/admin" className={linkStyle('/admin')}>Dashboard</Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className={linkStyle('/login')}>Login</Link>
            <Link to="/register" className={linkStyle('/register')}>Register</Link>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/profile')}
              className="px-3 py-2 hover:bg-[#E6E6E6] rounded-full text-[#2E2E2E]"
              title="Profile"
            >
              <FiUser size={22} />
            </button>
            {/* 👇 Removed logout button from here */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
