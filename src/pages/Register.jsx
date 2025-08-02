import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios to make HTTP requests

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send the form data to the backend API for registration
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        email,
        password,
      });

      // If registration is successful, set the success message
      setMessage(response.data.message);
      setError(""); // Clear any previous error
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Reset the form
    } catch (err) {
      // If registration fails, set the error message
      setError(err.response?.data?.message || "Error registering user");
      setMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20 bg-gradient-to-br from-[#f5f5f5] via-[#f0ede6] to-[#e8e6e3]">
      <div className="w-full max-w-md backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-2xl border border-[#ddd]">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2E2E2E] mb-2">
          Create Your Account ✨
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Register to get started with JobConnect
        </p>

        {error && <div className="text-red-600 mb-4 text-sm text-center">{error}</div>}
        {message && <div className="text-green-600 mb-4 text-sm text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Jane Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E8C6A] bg-[#F9F7F1] text-[#2E2E2E] placeholder-gray-400 transition"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E8C6A] bg-[#F9F7F1] text-[#2E2E2E] placeholder-gray-400 transition"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E8C6A] bg-[#F9F7F1] text-[#2E2E2E] placeholder-gray-400 transition"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E8C6A] bg-[#F9F7F1] text-[#2E2E2E] placeholder-gray-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5E8C6A] hover:bg-[#4C7458] text-white py-2 px-4 rounded-lg transition duration-300 font-semibold"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#5E8C6A] font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
