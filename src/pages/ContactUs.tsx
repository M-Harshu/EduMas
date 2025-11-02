import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-6">
        Have questions or need assistance? We’d love to hear from you!
      </p>
      <div className="space-y-2">
        <p>Email: <span className="text-blue-500">support@eduplatform.com</span></p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 123 Learning Street, Bengaluru, India</p>
      </div>
    </div>
  );
};

export default Contact;
