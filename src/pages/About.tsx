import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        About Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Mission</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Connect students and mentors for personalized learning</li>
            <li>Make learning engaging and interactive</li>
            <li>Provide a collaborative space where knowledge flows freely</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Vision</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Shape the future of education through innovation</li>
            <li>Build a community that thrives on curiosity and growth</li>
            <li>Empower everyone to access quality education</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Approach</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Passion-driven projects and innovative solutions</li>
            <li>Community collaboration and mentorship programs</li>
            <li>Accessible tools and resources for students and educators</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => window.location.href = "/courses"}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          View Courses
        </button>
      </div>
    </div>
  );
};

export default About;
