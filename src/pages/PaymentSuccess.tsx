// src/pages/PaymentSuccess.tsx
import React from "react";
import { useLocation } from "react-router-dom";

// Define the type for location state
interface PaymentSuccessState {
  courseId?: number | string;
}

export default function PaymentSuccess() {
  const loc = useLocation();
  const state = loc.state as PaymentSuccessState;
  const courseId = state?.courseId;

  return (
    <div className="p-6">
      <h2>Payment Successful ✅</h2>
      <p>
        Your purchase for course #{courseId} succeeded. Check your email for
        the invoice.
      </p>
      <a href={`/dashboard/courses/${courseId}`} className="btn">
        Go to Course
      </a>
    </div>
  );
}
