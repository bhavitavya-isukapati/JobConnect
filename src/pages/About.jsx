import { Lightbulb, Users, Globe2, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="pt-2 bg-white relative">
      {/* Decorative Background Wave */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-r from-green-50 via-white to-green-50 rounded-b-[80px] -z-10"></div>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-[#2F855A] mb-4">About JobConnect</h1>
        <p className="text-gray-600 text-lg">
          We’re more than a job board — we’re a career companion. JobConnect helps passionate professionals find their path and purpose.
        </p>
      </section>

      {/* Our Mission */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#2F855A] mb-6 flex items-center gap-2">
            <Lightbulb className="text-[#2F855A]" size={28} /> Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To empower job seekers by connecting them with meaningful opportunities and to enable companies to discover top talent with ease. We believe everyone deserves a shot at success.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#2F855A] mb-6 flex items-center gap-2">
            <Globe2 className="text-[#2F855A]" size={26} /> Our Vision
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            A world where career opportunities are accessible to all — no matter the background, location, or experience. We aim to build an ecosystem that supports career growth, trust, and innovation.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#2F855A] mb-6 flex items-center gap-2">
            <HeartHandshake className="text-[#2F855A]" size={26} /> Why We Started
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We saw talented individuals struggling to find the right jobs, and companies spending months trying to fill roles. JobConnect was born to fix this — a place where technology meets empathy, creating a smoother hiring journey for everyone.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-[#2F855A] mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#2F855A]">Transparency</h3>
              <p className="text-sm text-gray-600 mt-2">We believe in open, honest, and clear communication.</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#2F855A]">Inclusion</h3>
              <p className="text-sm text-gray-600 mt-2">Everyone deserves access to opportunities — without bias.</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#2F855A]">Innovation</h3>
              <p className="text-sm text-gray-600 mt-2">We constantly push boundaries to serve users better.</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#2F855A]">Empathy</h3>
              <p className="text-sm text-gray-600 mt-2">We listen, understand, and act with compassion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2F855A] text-white text-center py-20 px-4 rounded-t-[40px] mt-20">
        <h2 className="text-3xl font-bold mb-4">Ready to Build the Future with Us?</h2>
        <p className="text-lg mb-6">Join a platform where your goals meet real opportunities.</p>
        <Link
          to="/register"
          className="bg-white text-[#2F855A] px-6 py-2 rounded-full font-medium shadow hover:opacity-90 transition inline-block"
        >
          Join JobConnect
        </Link>
      </section>
    </main>
  );
}
