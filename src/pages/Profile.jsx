// src/pages/Profile.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon, PhoneIcon, CalendarIcon, MapPinIcon,
  DocumentIcon, WrenchScrewdriverIcon, AcademicCapIcon
} from '@heroicons/react/24/solid';
import { AuthContext } from '../App';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login', { replace: true });
  };

  if (!user) {
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
        {/* Left Panel */}
        <div className="bg-[#2F855A] text-white flex flex-col items-center justify-center p-8 md:w-1/3 space-y-4">
          <div className="w-28 h-28 bg-white text-[#2F855A] rounded-full flex items-center justify-center shadow-lg">
            <UserIcon className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold">{user.fullName || 'Unnamed'}</h2>
          <p className="text-sm opacity-90">{user.email}</p>

          <div className="flex flex-col gap-3 w-full mt-4">
            <button
              onClick={() => navigate('/edit-profile')}
              className="bg-white text-[#2F855A] font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-[#2F855A] font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:w-2/3 text-gray-800 space-y-6">
          <h3 className="text-xl font-semibold text-[#2F855A] border-b pb-2">Profile Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ['Date of Birth', user.dob, <CalendarIcon />],
              ['Phone', user.phone, <PhoneIcon />],
              ['Location', `${user.city || ''}, ${user.state || ''}`, <MapPinIcon />],
              ['Skills', user.skills, <WrenchScrewdriverIcon />],
              [
                'Resume',
                user.resume ? (
                  <a href={user.resume} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    View / Download
                  </a>
                ) : 'Not uploaded',
                <DocumentIcon />
              ],
              ['Education', user.education, <AcademicCapIcon />],
            ].map(([label, value, icon], i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="w-5 h-5 mt-1 text-[#2F855A]">{icon}</div>
                <div>
                  <div className="text-sm font-medium text-gray-600">{label}</div>
                  <div>{value || 'Not provided'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
