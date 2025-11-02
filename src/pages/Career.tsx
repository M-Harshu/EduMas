import React from "react";

const Career: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Careers at EduPlatform</h1>
        <p className="text-lg mb-4">
          Join our mission to make learning accessible and engaging for everyone. 
          We’re looking for passionate educators, developers, and designers to help us grow.
        </p>
        <p className="text-lg mb-4">
          🚀 Interested in joining our team? Email your resume to 
          <span className="font-semibold text-blue-500"> careers@eduplatform.com</span>.
        </p>
      </div>
    </div>
  );
};

export default Career;
