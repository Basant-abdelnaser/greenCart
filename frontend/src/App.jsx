import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import {  useState } from "react";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import { useAppContext } from "./context/AppContext";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const [loginClick, setLoginClick] = useState(false);

  console.log(loginClick);
  const { isSeller } = useAppContext();
  return (
    <div className="min-h-screen text-default bg-white">
      {loginClick && <Login setLoginClick={setLoginClick} />}
      {!isSellerPath && <Navbar setLoginClick={setLoginClick} />}
      <Toaster />
      <div
        className={isSellerPath ? "" : "md:px-16 lg:px-24 xl:px-32  md:py-16"}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
