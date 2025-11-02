import React from 'react';

const MentorResources: React.FC = () => {
  const resources = [
    {
      title: 'Course Creation Guide',
      desc: 'Learn how to structure, record, and publish your courses effectively.',
    },
    {
      title: 'Mentor Toolkit',
      desc: 'Access templates, design assets, and promotional materials to enhance your course delivery.',
    },
    {
      title: 'Community Mentorship Forum',
      desc: 'Connect with other mentors to exchange ideas and share best practices.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Mentor Resources</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-8 max-w-3xl">
        Everything you need to become a successful mentor on EduPlatform — from content planning to 
        community engagement and earnings optimization.
      </p>

      <div className="space-y-6">
        {resources.map((res, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{res.title}</h2>
            <p className="text-gray-700 dark:text-gray-400 mt-2">{res.desc}</p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorResources;
