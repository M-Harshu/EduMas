import React from "react";
import { Download } from "lucide-react";

const StudyMaterial: React.FC = () => {
  // You can replace these URLs later with your actual PDFs
  const resources = [
    { title: "React Basics", url: "https://www.lcg.ufrj.br/nodejs/books/react-beginners-handbook.pdf" },
    { title: "UI/UX Design Guide", url: "https://elmhurstpubliclibrary.org/lib/wp-content/uploads/UIUXBasics_Handout_021918jj.pdf" },
    { title: "JavaScript Advanced", url: "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Study Materials</h1>
        <div className="space-y-4">
          {resources.map((res, index) => (
            <a
              key={index}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition"
              download
            >
              <span className="text-gray-900 dark:text-white font-medium">{res.title}</span>
              <Download className="h-5 w-5 text-blue-600" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
