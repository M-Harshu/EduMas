import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Help Center</h1>
      <p className="text-gray-700 dark:text-gray-400 max-w-3xl">
        Welcome to our Help Center! Here you’ll find guides and troubleshooting steps 
        for common issues. If you still need assistance, feel free to reach out to our 
        support team via the Contact page.
      </p>
    </div>
  );
};

export default Help;
