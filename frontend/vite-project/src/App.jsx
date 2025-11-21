
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import MainNav from "./components/navigation/MainNav";
import SiteFooter from "./components/footers/SiteFooter";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <GoogleOAuthProvider clientId="1044204840128-tjp819inqefk1csnh0q5kirc9sipnuue.apps.googleusercontent.com">
      <AuthProvider>
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
                  <Route path="/shop" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Admin Routes - Protected */}
                  <Route element={<ProtectedRoute adminOnly={true} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/products/new" element={<AdminProductForm />} />
                  </Route>
                </Routes>
              </main>

              {/* Footer */}
              <SiteFooter />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
