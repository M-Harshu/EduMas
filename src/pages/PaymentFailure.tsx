// src/pages/PaymentFailure.tsx
import React from "react";
import { useLocation } from "react-router-dom";

// Define the type for location state
interface PaymentFailureState {
  reason?: string;
}

export default function PaymentFailure() {
  const loc = useLocation();
  const state = loc.state as PaymentFailureState;
  const reason = state?.reason || "unknown";

  return (
    <div className="p-6">
      <h2>Payment Failed ❌</h2>
      <p>Reason: {reason}</p>
      <a href="/" className="btn-ghost">
        Back to Home
      </a>
    </div>
  );
}
