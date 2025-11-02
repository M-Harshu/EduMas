import React from "react";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Blog</h1>
        <p className="text-lg mb-4 text-center">
          Stay updated with the latest insights, tutorials, and success stories from EduPlatform’s learning community.
        </p>
        <p className="text-lg text-center">
          New blog posts are coming soon — stay tuned! ✨
        </p>
      </div>
    </div>
  );
};

export default Blog;
