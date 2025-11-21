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
        <section className="page-section" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <SectionHeader title="Create Account" subtitle="Register" />

            {error && <p className="error-text">{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <PrimaryButton type="submit">Register</PrimaryButton>
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
                Already have an account? <Link to="/login" style={{ color: "blue" }}>Login</Link>
            </p>
        </section>
    );
};

export default RegisterPage;
