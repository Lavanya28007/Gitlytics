import React from "react";
import { FaUsers, FaChartLine, FaGithub } from "react-icons/fa";

const About_Us = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">
      {/* Heading */}
      <h1 className="text-center text-4xl md:text-5xl text-green-400 font-extrabold mb-6">
        About Us
      </h1>

      {/* Intro */}
      <p className="text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-16">
        At <span className="text-green-400 font-semibold">Gitlytics</span>, we’re
        passionate about helping developers showcase their skills and track
        their impact in the open-source world. Our platform provides clear,
        accurate, and insightful rankings of GitHub users, repositories, and
        projects, making it easy to discover top contributors and trending
        projects across the community.
      </p>

      {/* Value Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition">
          <FaUsers className="text-green-400 w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">For Developers</h3>
          <p className="text-gray-400">
            Track your growth, showcase your contributions, and gain recognition
            in the open-source ecosystem.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition">
          <FaChartLine className="text-green-400 w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">For Recruiters</h3>
          <p className="text-gray-400">
            Discover top talent with transparent, data-driven insights into
            developer performance and impact.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition">
          <FaGithub className="text-green-400 w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">For the Community</h3>
          <p className="text-gray-400">
            Celebrate achievements, explore trending projects, and connect with
            passionate contributors worldwide.
          </p>
        </div>
      </div>

      {/* Closing Statement */}
      <p className="text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-16">
        We believe in <span className="text-green-400">transparency</span>,{" "}
        <span className="text-green-400">collaboration</span>, and celebrating
        the achievements of developers everywhere. Join us in exploring the
        GitHub ecosystem like never before!
      </p>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <a
          href="/leaderboard"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          Explore Rankings →
        </a>
      </div>
    </div>
  );
};

export default About_Us;
