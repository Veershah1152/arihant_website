import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import AuthContext from "../context/AuthContext";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SectionHeader from "../components/others/SectionHeader";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { register, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await register(name, email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
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
        <section className="page-section">
            <div className="panel" style={{ maxWidth: "480px", margin: "0 auto" }}>
                <SectionHeader title="Create Account" subtitle="Register" />

                {error && (
                    <div className="pill pill--warning" style={{ width: "100%", justifyContent: "center", marginBottom: "1.5rem" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <label>
                        Full Name
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email Address
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <PrimaryButton type="submit">Register</PrimaryButton>
                </form>

                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <p className="muted" style={{ marginBottom: "1rem" }}>Or continue with</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google Login Failed")}
                        />
                    </div>
                </div>

                <p style={{ marginTop: "1.5rem", textAlign: "center", color: "var(--color-text-muted)" }}>
                    Already have an account? <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: "600" }}>Login</Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;
