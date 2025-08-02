import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formPayload = new FormData();
    formPayload.append("jobId", job._id);
    formPayload.append("jobTitle", job.title);
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("resume", formData.resume);
    formPayload.append("message", formData.message);

    try {
      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formPayload,
      });

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error submitting application:", error);
    }

    setTimeout(() => {
      navigate("/jobs");
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
        Job not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] via-[#f0ede6] to-[#e8e6e3] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-2xl border border-[#ddd]">
        <h2 className="text-2xl font-bold mb-4 text-[#2E2E2E]">
          Apply for {job.title}
        </h2>

        {submitted ? (
          <div className="text-green-600 text-lg font-medium text-center">
            🎉 Your application has been submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E8C6A] bg-[#F9F7F1] text-[#2E2E2E]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E8C6A] bg-[#F9F7F1] text-[#2E2E2E]"
              />
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Resume</label>
              <input
                type="file"
                name="resume"
                required
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:bg-[#E7E5DC] file:text-[#2E2E2E] hover:file:bg-[#dad7cd]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Why should we hire you?</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E8C6A] bg-[#F9F7F1] text-[#2E2E2E]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5E8C6A] hover:bg-[#4C7458] text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Apply;
