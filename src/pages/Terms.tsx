import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
        <p className="text-lg mb-4">
          Welcome to EduPlatform. By accessing or using our platform, you agree to comply with our terms and conditions. 
          These terms govern your use of all services, features, and content provided on our website.
        </p>
        <p className="text-lg mb-4">
          We reserve the right to update, modify, or terminate any part of our services at any time. Please read these 
          terms carefully before using EduPlatform.
        </p>
      </div>
    </div>
  );
};

export default Terms;
