import React, { useState } from "react";
import {
  User,
  Package,
  Heart,
  CreditCard,
  LogOut,
} from "lucide-react";

import AccountInfo from "../../Components/Account/AccountInfo/AccountInfo";
import MyOrders from "../../Components/Account/MyOrders/MyOrders";
import Wishlist from "../../Components/Account/Wishlist/Wishlist";
import PaymentMethods from "../../Components/Account/PaymentMethods/PaymentMethods";
import Logout from "../../Components/Account/Logout/Logout";

import "./AccountDashboard.css";

const AccountDashboard = () => {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountInfo />;
      case "orders":
        return <MyOrders />;
      case "wishlist":
        return <Wishlist />;
      case "payment":
        return <PaymentMethods />;
      case "logout":
        return <Logout />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className="account-dashboard py-5">
      <div className="container">
        <h2 className="dashboard-title text-center mb-5">My Account</h2>

        <div className="row g-4">
          {/* LEFT SIDEBAR */}
          <div className="col-lg-3">
            <div className="dashboard-sidebar">
              <button
                className={`sidebar-link ${activeTab === "account" ? "active" : ""}`}
                onClick={() => setActiveTab("account")}
              >
                <User size={20} /> Account
              </button>

              <button
                className={`sidebar-link ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <Package size={20} /> My Orders
              </button>

              <button
                className={`sidebar-link ${activeTab === "wishlist" ? "active" : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart size={20} /> Wishlist
              </button>

              <button
                className={`sidebar-link ${activeTab === "payment" ? "active" : ""}`}
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard size={20} /> Payment Methods
              </button>

              <button
                className={`sidebar-link ${activeTab === "logout" ? "active" : ""}`}
                onClick={() => setActiveTab("logout")}
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-9">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
