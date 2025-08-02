// src/pages/EditProfile.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const EditProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { updateUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    state: '',
    skills: '',
    education: '',
    resume: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
          setUser({
            fullName: data.fullName ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            dob: data.dob ?? '',
            city: data.city ?? '',
            state: data.state ?? '',
            skills: data.skills ?? '',
            education: data.education ?? '',
            resume: data.resume ?? ''
          });
        } else {
          console.error(data.message);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, resume: fileUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      });

      const updatedUser = await res.json();

      if (res.ok) {
        updateUser(updatedUser.user);
        alert('Profile updated successfully!');
        navigate('/profile');
      } else {
        alert(updatedUser.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#2F855A]">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ['Full Name', 'fullName', 'text'],
              ['Email', 'email', 'email'],
              ['Phone', 'phone', 'text'],
              ['Date of Birth', 'dob', 'date'],
              ['City', 'city', 'text'],
              ['State', 'state', 'text']
            ].map(([label, name, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={user[name] ?? ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required={name === 'fullName' || name === 'email'}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <textarea
              name="skills"
              value={user.skills ?? ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Education</label>
            <textarea
              name="education"
              value={user.education ?? ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="w-full"
            />
            {user.resume && (
              <p className="mt-2 text-sm text-blue-600">
                <a href={user.resume} target="_blank" rel="noopener noreferrer" className="underline">
                  View uploaded resume
                </a>
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#2F855A] text-white px-6 py-2 rounded-md hover:bg-[#276749] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
