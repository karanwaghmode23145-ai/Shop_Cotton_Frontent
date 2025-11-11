import React from "react";
import { ShoppingBag, Users, Star, Truck } from "lucide-react";
import "./SiteStats.css";

const SiteStats = () => {
  const stats = [
    {
      icon: <ShoppingBag size={36} />,
      number: "10K+",
      label: "Products Sold",
    },
    {
      icon: <Users size={36} />,
      number: "8K+",
      label: "Happy Customers",
    },
    {
      icon: <Star size={36} />,
      number: "4.9/5",
      label: "Average Rating",
    },
    {
      icon: <Truck size={36} />,
      number: "24H",
      label: "Fast Delivery",
    },
  ];

  return (
    <section className="site-stats py-5">
      <div className="container text-center">
        <h2 className="section-title mb-5">📈 Our Achievements</h2>
        <div className="row g-4 justify-content-center">
          {stats.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12">
              <div className="stat-card">
                <div className="stat-icon">{item.icon}</div>
                <h3 className="stat-number">{item.number}</h3>
                <p className="stat-label">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteStats;
