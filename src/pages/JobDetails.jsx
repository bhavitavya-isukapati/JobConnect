import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Job not found.");
      }
    };

    fetchJob();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
        {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl p-10 ring-1 ring-gray-100">
        {/* Title & Meta */}
        <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-xl text-gray-500 mb-2">{job.company}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm mt-2">
            <span className="text-gray-500">{job.location}</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              Posted 2 days ago
            </span>
          </div>
        </div>

        {/* Job Description */}
        <section className="mb-8">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Job Description
          </span>
          <p className="text-gray-700 text-[17px] leading-relaxed">
            {job.description}
          </p>
        </section>

        {/* Responsibilities */}
        <section className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Responsibilities
          </span>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {(job.responsibilities || []).map((item, index) => (
              <li key={index} className="hover:translate-x-1 transition-transform duration-200 ease-in-out">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className="mb-8">
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Requirements
          </span>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {(job.requirements || []).map((item, index) => (
              <li key={index} className="hover:translate-x-1 transition-transform duration-200 ease-in-out">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Preferred Qualifications */}
        <section className="mb-10">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Preferred Qualifications
          </span>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {(job.preferredQualifications || []).map((item, index) => (
              <li key={index} className="hover:translate-x-1 transition-transform duration-200 ease-in-out">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Buttons */}
        <div className="flex justify-between flex-wrap items-center gap-4">
          <Link
            to="/jobs"
            className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            ← Back to Jobs
          </Link>

          <Link
            to={`/apply/${job._id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
