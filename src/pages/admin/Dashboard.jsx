import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    jobsPosted: 0,
    applications: 0,
    admins: 1,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats", { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] via-[#f0ede6] to-[#e8e6e3] px-6 py-12">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-[#2E2E2E] mb-6 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Post a Job */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#2E2E2E] mb-2">Post a Job</h2>
            <p className="text-gray-600 text-sm mb-4">
              Add new job listings to the portal with all relevant details.
            </p>
            <Link
              to="/admin/add-job"
              className="inline-block bg-[#5E8C6A] hover:bg-[#4C7458] text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              Add Job
            </Link>
          </div>

          {/* View Applications */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#2E2E2E] mb-2">View Applications</h2>
            <p className="text-gray-600 text-sm mb-4">
              Check applications submitted by candidates for job postings.
            </p>
            <Link
              to="/admin/applications"
              className="inline-block bg-[#5E8C6A] hover:bg-[#4C7458] text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              View Applications
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#2E2E2E] mb-2">Quick Stats</h2>
            <p className="text-gray-600 text-sm mb-2">Jobs Posted: {stats.jobsPosted}</p>
            <p className="text-gray-600 text-sm mb-2">Applications: {stats.applications}</p>
            <p className="text-gray-600 text-sm">Admins: {stats.admins}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
