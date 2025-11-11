import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import HomePage from "./pages/HomePage";
import Product from "./Pages/Product";
import ShopPage from "./Pages/ShopPage";
import CheckoutPage from "./Pages/CheckoutPage";
import WishlistPage from "./Pages/WishlistPage";
import AccountDashboard from "./Pages/AccountDashboard/AccountDashboard";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import ImageUpload from "./Pages/ImageUpload";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";  // ✅ <-- added this line
import ProfilePage from "./Pages/ProfilePage";
import AddProductPage from "./Pages/AddProductPage";
import Orders from "./Pages/Orders";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import AddReview from "./Pages/AddReview";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/imageupload" element={<ImageUpload />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} /> {/* ✅ Added this */}
        <Route path="/review/:id" element={<AddReview />} />


        {/* ✅ Protected Routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accountdashboard"
          element={
            <ProtectedRoute>
              <AccountDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/accountdashboard" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
