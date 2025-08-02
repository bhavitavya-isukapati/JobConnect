import React, { useEffect, useState } from 'react';

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/api/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in as admin');
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        setApplications(data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        setError(error.message);
        setApplications([]); // Prevent .map from crashing
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Job Applications</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">No applications found.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-gray-700 mb-2">{app.jobTitle}</h2>
              <p><span className="font-semibold">Name:</span> {app.name}</p>
              <p><span className="font-semibold">Email:</span> {app.email}</p>
              <p><span className="font-semibold">Message:</span> {app.message}</p>
              <p>
                <span className="font-semibold">Resume:</span>{' '}
                {app.resume ? (
                  <a
                    href={`http://localhost:5000/uploads/${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                ) : (
                  'Not uploaded'
                )}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Submitted on: {new Date(app.appliedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
