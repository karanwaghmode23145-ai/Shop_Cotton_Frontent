import React from "react";
import { CreditCard } from "lucide-react";

const PaymentMethods = () => {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="fw-bold mb-4">💳 Payment Methods</h4>

      <div className="payment-box border rounded p-3 mb-3">
        <CreditCard size={24} className="me-2 text-warning" />
        <span>**** **** **** 4242</span>
        <p className="small text-muted mt-1">Expires: 12/26</p>
      </div>

      <button className="btn btn-warning fw-bold">Add New Card</button>
    </div>
  );
};

export default PaymentMethods;
