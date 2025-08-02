import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import JobSearchImage from '../assets/jobsearch.jpg';

const Home = () => { 
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2F855A] leading-tight">
            Find Your Dream Job with <span className="text-[#1A202C]">JobConnect</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover thousands of job listings and connect with top companies to take your career to the next level.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/jobs" 
              className="px-6 py-3 bg-[#2F855A] text-white font-semibold rounded-lg shadow-md hover:bg-[#276749] hover:shadow-lg transition duration-300"
            >
              Browse Jobs
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-3 border border-[#2F855A] text-[#2F855A] font-semibold rounded-lg hover:bg-[#E6FFFA] hover:shadow-lg transition duration-300"
            >
              Join Now
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-xl">
            <img 
              src={JobSearchImage} 
              alt="Job search illustration" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <h2 className="text-3xl font-bold text-center text-[#2E2E2E] mb-10">
          Why Choose <span className="text-[#2F855A]">JobConnect?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Personalized Matches',
              desc: 'We tailor job suggestions to match your skills, experience, and preferences.',
              icon: '👤',
            },
            {
              title: 'Verified Companies',
              desc: 'We ensure all job listings are from legitimate, verified employers.',
              icon: '✅',
            },
            {
              title: 'Easy Application',
              desc: 'Apply to multiple jobs in just a few clicks with your saved profile.',
              icon: '⚡',
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#2F855A] mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[#2E2E2E] mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { step: '1. Search', desc: 'Browse jobs that match your profile and preferences.', icon: '🔍' },
            { step: '2. Apply', desc: 'Submit applications quickly using your saved details.', icon: '📄' },
            { step: '3. Get Hired', desc: 'Connect with top employers and land your dream job!', icon: '🎯' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#2F855A] mb-2">{item.step}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: '25K+', label: 'Jobs Posted' },
            { value: '15K+', label: 'Active Users' },
            { value: '500+', label: 'Verified Companies' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="p-6 border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
            >
              <h3 className="text-4xl font-extrabold text-[#2F855A]">{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F9FAFB] py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-[#2E2E2E] mb-12">What Our Users Say</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              name: 'Sarah, Frontend Developer',
              quote: 'Thanks to JobConnect, I landed my dream job in just 3 weeks!',
            },
            {
              name: 'Raj, Data Analyst',
              quote: 'Smooth process, great opportunities, and legit companies!',
            },
          ].map((t, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <p className="text-[#2F855A] font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#2F855A] text-white text-center py-16 mt-16 rounded-xl mx-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
        <p className="mb-6 text-lg">Sign up today and take the next step in your career.</p>
        <Link 
          to="/register" 
          className="px-6 py-3 bg-white text-[#2F855A] font-semibold rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Join JobConnect
        </Link>
      </section>
    </div>
  );
};

export default Home;
