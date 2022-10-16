import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Products } from "./Products/Products";
import { SingleProduct } from "./SingleProduct";
import { Login } from "./User/Login";
import { Register } from "./User/Register";
import { Account } from "./User/Account";
import { Dashboard } from "./Dashboard/Dashboard";
import { Orders } from "./Orders/Orders";
import { AccountUpdate } from "./User/AccountUpdate";
import { ForgotPassword } from "./User/ForgotPassword";
import { Cart } from "./Cart/Cart";
import { Shipping } from "./Cart/Shipping";
import { CartConfirm } from "./Cart/CartConfirm";
import { Payment } from "./Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentSuccess } from "./Cart/PaymentSuccess";
import { SingleOrder } from "./Orders/SingleOrder";
import { AdminProducts } from "./Admin/AdminProducts";
import { AdminOrders } from "./Admin/AdminOrders";
import { AdminUser } from "./Admin/AdminUser";
import { AdminReviews } from "./Admin/AdminReviews";
import { NewProduct } from "./Admin/NewProduct";
import { UpdateProductAdmin } from "./Admin/UpdateProductAdmin";
import { UpdateOrderAdmin } from "./Admin/UpdateOrderAdmin";
import { UpdateUserAdmin } from "./Admin/UpdateUserAdmin";
import { NotFound } from "./NotFound";

export const AllRoutes = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<SingleOrder />} />
        <Route path="/me/update" element={<AccountUpdate />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/cart/confirm" element={<CartConfirm />} />
        {stripeApiKey && (
          <Route
            path="/cart/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}
        <Route path="/cart/payment/success" element={<PaymentSuccess />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProductAdmin />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/order/:id" element={<UpdateOrderAdmin />} />
        <Route path="/admin/users" element={<AdminUser />} />
        <Route path="/admin/user/:id" element={<UpdateUserAdmin />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
