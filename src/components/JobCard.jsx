import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Building, Star } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-gradient-to-br from-white via-[#f9fdfa] to-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-sm flex flex-col justify-between p-6 hover:-translate-y-1">
      
      {/* Optional Top Icon Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-[#2F855A] font-medium bg-green-50 px-3 py-1 rounded-full">
          <Star size={16} /> Featured
        </div>
        <span className="text-xs text-gray-400">{job.posted || '2d ago'}</span>
      </div>

      {/* Job Info */}
      <div>
        <h3 className="text-xl font-semibold text-[#2F855A] mb-3">{job.title}</h3>

        <div className="flex items-center gap-2 text-gray-700 mb-1">
          <Building size={18} className="text-[#2F855A]" />
          <span>{job.company}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <MapPin size={18} className="text-[#2F855A]" />
          <span>{job.location.replace(/Chicago|Boston|San Francisco|New York|Los Angeles|Seattle|Austin|Denver/gi, 'Bangalore')}</span>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-dashed border-gray-200 my-4" />

      {/* View Details Button */}
      <div className="flex justify-center">
        <Link
          to={`/jobs/${job._id}`}
          className="bg-[#2F855A] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#276749] transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
