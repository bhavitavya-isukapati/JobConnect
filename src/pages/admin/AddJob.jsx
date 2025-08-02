import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    responsibilities: '',
    requirements: '',
    preferredQualifications: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split multiline fields into arrays
    const processedData = {
      ...formData,
      responsibilities: formData.responsibilities.split('\n').filter(line => line.trim() !== ''),
      requirements: formData.requirements.split('\n').filter(line => line.trim() !== ''),
      preferredQualifications: formData.preferredQualifications.split('\n').filter(line => line.trim() !== ''),
    };

    try {
      const token = localStorage.getItem('token'); // ✅ Fetch JWT token from localStorage

      const res = await axios.post(
        'http://localhost:5000/api/jobs',
        processedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Send token in header
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        alert('Job posted successfully!');
        console.log('New Job Posted:', res.data);
        setFormData({
          title: '',
          company: '',
          location: '',
          type: '',
          description: '',
          responsibilities: '',
          requirements: '',
          preferredQualifications: '',
        });
      } else {
        alert('Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('An error occurred while posting the job.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] via-[#f0ede6] to-[#e8e6e3] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-[#ddd] p-8">
        <h2 className="text-3xl font-bold text-center text-[#2E2E2E] mb-6">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Job Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Full-time, Part-time, Internship..."
                className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Responsibilities </label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              rows={3}
              placeholder="One responsibility per line"
              className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Requirements </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              placeholder="One requirement per line"
              className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Preferred Qualifications </label>
            <textarea
              name="preferredQualifications"
              value={formData.preferredQualifications}
              onChange={handleChange}
              rows={3}
              placeholder="Optional"
              className="w-full px-4 py-2 border rounded-lg bg-[#F9F7F1] focus:outline-none focus:ring-2 focus:ring-[#5E8C6A]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5E8C6A] hover:bg-[#4C7458] text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
