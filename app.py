from flask import Flask, request, jsonify
from flask_cors import CORS
import razorpay

app = Flask(__name__)
CORS(app)

# --- Razorpay Test Credentials ---
RAZORPAY_KEY_ID = "rzp_test_RQ4RnKsMjZFWhc"
RAZORPAY_KEY_SECRET = "tFNHLz8ajPqh3Jsn1qZopzVd"

# Initialize Razorpay client
razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

@app.route("/api/create_order", methods=["POST"])
def create_order():
    data = request.get_json()
    amount = data.get("amount", 0)  # in paise
    currency = data.get("currency", "INR")

    try:
        order = razorpay_client.order.create({
            "amount": amount,
            "currency": currency,
            "payment_capture": 1
        })
        return jsonify({
            "orderId": order["id"],
            "key": RAZORPAY_KEY_ID
        })
    except Exception as e:
        print("Error creating order:", e)
        return jsonify({"error": "create_order_failed"}), 500
@app.route("/api/verify_payment", methods=["POST"])
def verify_payment():
    data = request.get_json()
    order_id = data.get("razorpay_order_id")
    payment_id = data.get("razorpay_payment_id")
    signature = data.get("razorpay_signature")

    try:
        # Verify payment signature
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        })
        return jsonify({"success": True})
    except Exception as e:
        print("Verification failed:", e)
        return jsonify({"success": False, "reason": "signature_mismatch"}), 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)
