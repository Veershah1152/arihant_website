import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import AuthContext from "../context/AuthContext";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SectionHeader from "../components/others/SectionHeader";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await googleLogin(credentialResponse.credential);
            navigate("/");
        } catch (err) {
            setError("Google Login Failed");
        }
    };

    return (
        <section className="page-section" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <SectionHeader title="Welcome Back" subtitle="Login" />

            {error && <p className="error-text">{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <PrimaryButton type="submit">Sign In</PrimaryButton>
            </form>

            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <p className="muted">Or continue with</p>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("Google Login Failed")}
                    />
                </div>
            </div>

            <p style={{ marginTop: "1rem", textAlign: "center" }}>
                New customer? <Link to="/register" style={{ color: "blue" }}>Create an account</Link>
            </p>
        </section>
    );
};

export default LoginPage;
