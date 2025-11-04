import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const COURSES = [
  { id: "1", title: "React Basics", price: 24.0 },
  { id: "2", title: "Advanced JavaScript", price: 34.0 },
  { id: "3", title: "Fullstack Development", price: 50.0 },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [method, setMethod] = useState<string>("UPI");
  const [showUPI, setShowUPI] = useState<boolean>(false);

  useEffect(() => {
    const stateCourse = location.state?.course;
    if (stateCourse) {
      setCourse(stateCourse);
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get("id");
    if (courseId) {
      const found = COURSES.find((c) => c.id === courseId);
      if (found) setCourse(found);
    }
  }, [location]);

  const handlePayment = async () => {
    if (!course) return;

    if (method === "UPI") {
      setShowUPI(true);
    } else {
      // Create Razorpay order via Flask backend
      try {
        const res = await fetch("http://localhost:5000/api/create_order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: course.price * 100, currency: "INR" }), // amount in paise
        });
        const data = await res.json();

        const options = {
          key: data.key,
          amount: course.price * 100,
          currency: "INR",
          name: "Edumas Course",
          description: course.title,
          order_id: data.orderId,
          handler: async function (response: any) {
            // Verify payment with backend
            const verifyRes = await fetch(
              "http://localhost:5000/api/verify_payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              }
            );
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
  // Save course to localStorage (optional fallback)
  const courses = JSON.parse(localStorage.getItem("courses") || "[]");
  if (!courses.find((c: any) => c.id === course.id)) {
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  }

  // ✅ Pass paid course to dashboard
  navigate("/student-dashboard", { state: { paidCourse: course } });
} else {
  alert("Payment verification failed");
}

          },
          prefill: {
            name: "Student Name",
            email: "student@example.com",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error(err);
        alert("Razorpay order creation failed");
      }
    }
  };

  const handleUPIPaymentConfirm = () => {
const courses = JSON.parse(localStorage.getItem("courses") || "[]");
if (!courses.find((c: any) => c.id === course.id)) {
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses))
}

// ✅ Pass paid course to dashboard
navigate("/student-dashboard", { state: { paidCourse: course } });
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
  Price: ${course.price?.toFixed(2) || "24.00"}
</p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No course selected.
          </p>
        )}

        {!showUPI && (
          <>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Choose Payment Method
            </h2>

            <div className="space-y-3">
              {["UPI", "Credit/Debit Card", "Net Banking", "Wallet"].map(
                (option) => (
                  <label
                    key={option}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                      method === option
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {option}
                    </span>
                    <input
                      type="radio"
                      name="payment"
                      value={option}
                      checked={method === option}
                      onChange={() => setMethod(option)}
                      className="accent-blue-600"
                    />
                  </label>
                )
              )}
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Pay Now
            </button>
          </>
        )}

        {showUPI && (
          <div className="text-center mt-6">
            <img
              src="/my-upi-qr.png"
              alt="UPI QR Code"
              className="w-40 mx-auto mb-4"
            />
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Scan this QR code using your UPI app and pay ₹{course.price || 499}
            </p>
            <button
              onClick={handleUPIPaymentConfirm}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
            >
              Payment Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
