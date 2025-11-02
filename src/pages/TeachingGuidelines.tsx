import React from 'react';

const TeachingGuidelines: React.FC = () => {
  const guidelines = [
    'Create inclusive and engaging content that respects all learners.',
    'Use real-world examples and interactive exercises to reinforce concepts.',
    'Provide timely feedback and encourage open communication.',
    'Maintain academic integrity and originality in all your materials.',
    'Respect EduPlatform’s policies on course quality and learner satisfaction.',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Teaching Guidelines</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-8 max-w-3xl">
        These guidelines help mentors deliver the best possible learning experience while maintaining 
        professionalism and ethical standards.
      </p>

      <ul className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-400">
        {guidelines.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="text-gray-700 dark:text-gray-400 mt-6">
        Following these guidelines ensures that learners have a positive and productive experience on EduPlatform.
      </p>
    </div>
  );
};

export default TeachingGuidelines;
