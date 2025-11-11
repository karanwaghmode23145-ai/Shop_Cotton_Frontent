import React from "react";
import {
  Truck,
  Headphones,
  Tag,
  RefreshCcw,
  ShoppingBag,
} from "lucide-react";
import "./ShopFeatures.css";

const ShopFeatures = () => {
  const features = [
    {
      id: 1,
      icon: <Tag size={40} />,
      title: "Best Prices & Offers",
      subtitle: "Orders $50 or more",
    },
    {
      id: 2,
      icon: <Truck size={40} />,
      title: "Free Delivery",
      subtitle: "24/7 amazing services",
    },
    {
      id: 3,
      icon: <Headphones size={40} />,
      title: "Great Daily Deals",
      subtitle: "When you sign up",
    },
    {
      id: 4,
      icon: <ShoppingBag size={40} />,
      title: "Wide Assortment",
      subtitle: "Mega Discounts",
    },
    {
      id: 5,
      icon: <RefreshCcw size={40} />,
      title: "Easy Returns",
      subtitle: "Within 30 days",
    },
  ];

  return (
    <div className="container-fluid shopfeatures-wrapper py-5">
      <div className="row justify-content-center g-4">
        {features.map((item) => (
          <div key={item.id} className="col-lg-2 col-md-4 col-sm-6">
            <div className="feature-card text-center">
              <div className="icon-box">{item.icon}</div>
              <h5 className="feature-title">{item.title}</h5>
              <p className="feature-subtext">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopFeatures;
