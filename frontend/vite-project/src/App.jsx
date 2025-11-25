

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import MainNav from "./components/navigation/MainNav";
import SiteFooter from "./components/footers/SiteFooter";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import LegalPolicies from "./pages/LegalPolicies";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminCollections from "./pages/admin/AdminCollections";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <GoogleOAuthProvider clientId="798059138752-67798n9jdb6hjcaesv3mmqvcussov9ar.apps.googleusercontent.com">
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="app-shell">
              <div className="shell-inner">
                {/* Main Navigation */}
                <MainNav />

                {/* Main Content */}
                <main className="content-area">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/shop" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success/:id" element={<OrderSuccess />} />
                    <Route path="/legal" element={<LegalPolicies />} />


                    {/* User Protected Route */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<UserDashboard />} />
                    </Route>

                    {/* Admin Routes - Protected */}
                    <Route element={<ProtectedRoute adminOnly={true} />}>
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin/products" element={<AdminProducts />} />
                      <Route path="/admin/products/new" element={<AdminProductForm />} />
                      <Route path="/admin/users" element={<AdminUsers />} />
                      <Route path="/admin/orders" element={<AdminOrders />} />
                      <Route path="/admin/analytics" element={<AdminAnalytics />} />
                      <Route path="/admin/banners" element={<AdminBanners />} />
                      <Route path="/admin/reviews" element={<AdminReviews />} />
                      <Route path="/admin/coupons" element={<AdminCoupons />} />
                      <Route path="/admin/collections" element={<AdminCollections />} />
                    </Route>
                  </Routes>
                </main>

                {/* Footer */}
                <SiteFooter />
              </div>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
