import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [method, setMethod] = useState<string>("UPI");

  const handlePayment = () => {
    // here you would integrate with Razorpay / Stripe / PayPal API
    alert(`Processing ${method} payment for ${course?.title || "course"}...`);
    navigate("/dashboard"); // after payment, go back to dashboard
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Checkout
        </h1>

        {course ? (
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {course.title}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Price: ₹{course.price || 499}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No course selected.
          </p>
        )}

        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Choose Payment Method
        </h2>

        <div className="space-y-3">
          {["UPI", "Credit/Debit Card", "Net Banking", "Wallet"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                method === option
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <span className="text-gray-800 dark:text-gray-200">{option}</span>
              <input
                type="radio"
                name="payment"
                value={option}
                checked={method === option}
                onChange={() => setMethod(option)}
                className="accent-blue-600"
              />
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
