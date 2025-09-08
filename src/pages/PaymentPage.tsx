import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  // Optionally get course info if you pass it via state
  const course = location.state?.course;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Payment Page
      </h1>
      {course ? (
        <p className="text-gray-700 dark:text-gray-300">
          Paying for: <strong>{course.title}</strong> - ₹{course.price || 499}
        </p>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">Select a course to pay.</p>
      )}
    </div>
  );
};

export default PaymentPage;