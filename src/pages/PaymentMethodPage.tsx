// pages/PaymentMethodPage.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Your UPI QR image (placed in public folder as /my-upi-qr.png)
const UPI_QR = "/my-upi-qr.png";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CourseState {
  course: {
    id: string | number;
    title: string;
    amountUSD?: number;
    amountINR?: number;
  };
}

export default function PaymentMethodPage() {
  const { method } = useParams();
  const location = useLocation();
  const state = location.state as CourseState;
  const course = state?.course;

  const [loading, setLoading] = useState(false);
  const [amountINR, setAmountINR] = useState<number>(0);
  const navigate = useNavigate();

  // ✅ Load Razorpay script once
  useEffect(() => {
    if (!document.getElementById("rzp-script")) {
      const script = document.createElement("script");
      script.id = "rzp-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
    }
  }, []);

  // ✅ Convert USD → INR if needed
  useEffect(() => {
    if (!course) return;
    const USD_TO_INR = 83;
    setAmountINR(
      course.amountINR ??
        (course.amountUSD ? Math.round(course.amountUSD * USD_TO_INR) : 499)
    );
  }, [course]);

  // ✅ Start Razorpay Payment
  const startPayment = async () => {
    if (!course) return;
    setLoading(true);

    try {
      const amountPaise = amountINR * 100;

      // ✅ Create Razorpay order via backend
      const orderRes = await axios.post("http://localhost:5000/api/create_order", {
        amount: amountPaise,
        currency: "INR",
      });

      const { orderId, key } = orderRes.data;

      // ✅ Configure Razorpay popup
      const options = {
        key,
        amount: amountPaise,
        currency: "INR",
        name: "EduMas",
        description: `Purchase course ${course.title}`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            console.log("Payment success:", response);

            // ✅ Verify payment on backend
            await axios.post("http://localhost:5000/api/verify_payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course.id,
            });

            // ✅ Redirect to success → dashboard
            navigate("/payment/success", { state: { courseId: course.id } });
          } catch (err) {
            console.error("Verification failed:", err);
            navigate("/payment/failure", {
              state: { reason: "verification_failed" },
            });
          }
        },
        prefill: {
          name: "Student User",
          email: "student@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: () => navigate(`/payment/${course.id}`),
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err: any) {
      console.error("Create order error:", err.response?.data || err);
      navigate("/payment/failure", { state: { reason: "create_order_failed" } });
    } finally {
      setLoading(false);
    }
  };

  // --- UI ---

  if (!course)
    return <p className="p-6 text-center text-lg text-gray-700">Course not found!</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Pay for "{course.title}" — {method?.toUpperCase()}
      </h2>

      <p className="text-lg mb-6 font-medium text-center text-gray-700">
  Amount: {course.amountUSD ? `$${course.amountUSD}` : `₹${amountINR}`}
</p>


      {/* ✅ Show QR if UPI selected */}
      {method === "upi" && (
        <div className="mb-6 text-center">
          <p className="mb-2 text-gray-700">
            Scan this QR code with your UPI app:
          </p>

          <img
            src={UPI_QR}
            alt="UPI QR Code"
            className="mx-auto my-4 w-48 h-48 object-contain rounded-lg border-2 border-gray-300 shadow-sm"
          />

          <p className="text-gray-700 dark:text-gray-300 mb-4">
  Scan this QR code using your UPI app and pay{" "}
  {course.amountUSD ? `$${course.amountUSD}` : `₹${amountINR}`}
</p>


          <p className="text-sm text-gray-500 mt-2">
            After completing the payment in your UPI app, click “Pay” to confirm
            and register this course in your dashboard.
          </p>
        </div>
      )}

      {method === "card" && (
        <div className="mb-6 text-center">
          <p className="text-gray-700">
            Enter your card details securely in the Razorpay popup.
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={startPayment}
          disabled={loading}
          className={`px-6 py-2 rounded-md shadow text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
  ? "Processing..."
  : course.amountUSD
  ? `Pay $${course.amountUSD}`
  : `Pay ₹${amountINR}`}
        </button>
        <button
          onClick={() => navigate(`/payment/${course.id}`)}
          className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>
      </div>
    </div>
  );
}
