import React from "react";

const Press: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Press & Media</h1>
        <p className="text-lg mb-4">
          Welcome to the EduPlatform Press Center. Here, you can find our official announcements, 
          media coverage, and brand resources.
        </p>
        <p className="text-lg">
          For press inquiries, reach out to us at 
          <span className="font-semibold text-blue-500"> press@eduplatform.com</span>.
        </p>
      </div>
    </div>
  );
};

export default Press;
