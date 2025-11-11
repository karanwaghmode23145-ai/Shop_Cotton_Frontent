import React from "react";
import "./StayHomeSection.css";

const StayHomeSection = () => {
  return (
    <div className="container my-5">
      <div className="stayhome-section">
        <div className="stayhome-content text-center">
          <h2 className="stayhome-title">
            🏡 Stay Home & Get Your Daily Needs From Our Shop
          </h2>
          <p className="stayhome-subtext">
            Fast delivery, fresh groceries, and all your essentials — delivered safely to your door.
          </p>

          <form className="subscribe-form">
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StayHomeSection;
