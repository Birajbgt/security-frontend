// import {
//   Route,
//   BrowserRouter as Router,
//   Routes
// } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
// import Footer from "./components/footer/Footer";
// import Navbar from "./components/navbar/Navbar";
// import AddressForm from "./pages/address/AddressForm";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import Category from "./pages/admin/category/Category";
// import Product from "./pages/admin/product/Product";
// import UpdateProduct from "./pages/admin/product/ProductUpdate";
// import ProductDescription from "./pages/user/product/ProductDescription";
// // import CartScreen from "./pages/cart/CartScreen";
// import ViewOrders from "./pages/admin/order/ViewOrders";
// import ViewUsers from "./pages/admin/users/ViewUsers";
// import AboutUs from "./pages/constant/AboutUs";
// import Contactus from "./pages/constant/Contactus";
// import ForgotPassword from "./pages/forgetpassword/ForgetPassword";
// import HomeScreen from "./pages/homepage/HomeScreen";
// import ProductScreen from "./pages/homepage/ProductScreen";
// import Login from "./pages/login/LoginScreen";
// import Register from "./pages/register/RegisterScreen";
// import ResetPassword from "./pages/resetPassword/ResetPassword";
// import Cart from "./pages/user/cart/Cart";
// import OrderList from "./pages/user/order/OrderList";
// import Profile from "./pages/user/profile/Profile";
// import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
// import AdminRoutes from "./protected_routes/AdminRoutes";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <ToastContainer />
//       <Routes>
//         <Route path='/aboutus' element={<AboutUs />} />
//         {/* <Route path='/' element={<Contactus />} /> */}
//         <Route path='/' element={<HomeScreen />} />
//         <Route path='/contact' element={<Contactus />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/productdescription/:id' element={<ProductDescription />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/forgot-password' element={<ForgotPassword />} />
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/product' element={<ProductScreen />} />
//         <Route path='/address' element={<AddressForm />} />
//         <Route path='/orderlist' element={<OrderList />} />
//         <Route path='/verify-email/:token' element={<VerifyEmail />} />
//         <Route path='/resetPassword/:token' element={<ResetPassword />} />

//         <Route element={<AdminRoutes />}>
//           <Route path='/admin/category' element={<Category />} />
//           <Route path='/admin/product' element={<Product />} />
//           <Route path='/admin/orders' element={<ViewOrders />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/admin/customers" element={<ViewUsers />} />
//           <Route path='/admin/update/:id' element={<UpdateProduct />} />
//         </Route>

//       </Routes>
//       <Routes>
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import axios from "axios"; // Import axios
import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AddressForm from "./pages/address/AddressForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Category from "./pages/admin/category/Category";
import ViewOrders from "./pages/admin/order/ViewOrders";
import Product from "./pages/admin/product/Product";
import UpdateProduct from "./pages/admin/product/ProductUpdate";
import ViewUsers from "./pages/admin/users/ViewUsers";
import AboutUs from "./pages/constant/AboutUs";
import Contactus from "./pages/constant/Contactus";
import ForgotPassword from "./pages/forgetpassword/ForgetPassword";
import HomeScreen from "./pages/homepage/HomeScreen";
import ProductScreen from "./pages/homepage/ProductScreen";
import Login from "./pages/login/LoginScreen";
import Register from "./pages/register/RegisterScreen";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Cart from "./pages/user/cart/Cart";
import OrderList from "./pages/user/order/OrderList";
import ProductDescription from "./pages/user/product/ProductDescription";
import Profile from "./pages/user/profile/Profile";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import AdminRoutes from "./protected_routes/AdminRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://localhost:5500/api/auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setIsAuthenticated(true);

        } else {
          // localStorage.removeItem("token");
          toast.error("Session expired. Please log in again.");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        toast.error("Invalid session. Please log in again.");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading state until authentication check is complete
  }

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/' element={<HomeScreen />} />
        <Route path='/contact' element={<Contactus />} />
        <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path='/productdescription/:id' element={<ProductDescription />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product' element={<ProductScreen />} />
        <Route path='/address' element={<AddressForm />} />
        <Route path='/orderlist' element={<OrderList />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />

        <Route element={<AdminRoutes />}>
          <Route path='/admin/category' element={<Category />} />
          <Route path='/admin/product' element={<Product />} />
          <Route path='/admin/orders' element={<ViewOrders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<ViewUsers />} />
          <Route path='/admin/update/:id' element={<UpdateProduct />} />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
