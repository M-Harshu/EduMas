import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'How can I enroll in a course?',
      answer: 'Simply browse the courses and click on “Enroll Now” to get started.'
    },
    {
      question: 'Are there any free courses available?',
      answer: 'Yes! We offer both free and premium courses across various categories.'
    },
    {
      question: 'How do I get my certificate?',
      answer: 'Once you complete a course, your certificate will be available for download on your dashboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="text-gray-700 dark:text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
