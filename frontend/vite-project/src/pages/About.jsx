import { useState } from "react";
import SectionHeader from "../components/others/SectionHeader";
import LegalPolicies from "./LegalPolicies";

const About = () => {
    const [activeTab, setActiveTab] = useState("about");

    const tabs = [
        { id: "about", label: "About Us" },
        { id: "terms", label: "Terms & Conditions" },
        { id: "privacy", label: "Privacy Policy" },
        { id: "shipping", label: "Shipping & Refunds" },
    ];

    return (
        <section className="page-section">
            <SectionHeader title="About & Legal" subtitle="Learn more about us" />

            {/* Tab Navigation */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
                flexWrap: "wrap"
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: "0.75rem 1.5rem",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid var(--color-primary)",
                            background: activeTab === tab.id ? "var(--color-primary)" : "transparent",
                            color: activeTab === tab.id ? "#fff" : "var(--color-primary)",
                            cursor: "pointer",
                            fontWeight: "500",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="panel" style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>

                {activeTab === "about" && (
                    <div className="fade-in">
                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>Welcome to Arihant Jewellers</h3>
                            <p>
                                Based in the heart of Nashik, Maharashtra, <strong>Arihant Jewellers</strong> is a premier destination for exquisite jewellery that blends tradition with contemporary elegance. Located at <em>Shop no.7, Bhanuprasad Apt. Advait Colony, Canada Corner</em>, we have established ourselves as a trusted name in the world of fine jewellery.
                            </p>
                        </div>

                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>Our Philosophy</h3>
                            <p>
                                We believe that jewellery is more than just an accessory; it is an expression of identity, a marker of special moments, and a legacy passed down through generations. Our commitment is to provide our customers with pieces that are not only visually stunning but also crafted with the highest standards of quality and purity.
                            </p>
                        </div>

                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>Why Choose Us?</h3>
                            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <li><strong>Authenticity:</strong> We guarantee the purity and quality of every piece we sell.</li>
                                <li><strong>Craftsmanship:</strong> Our collection features intricate designs crafted by skilled artisans.</li>
                                <li><strong>Transparency:</strong> We pride ourselves on honest pricing and transparent business practices.</li>
                                <li><strong>Customer Focus:</strong> Your satisfaction is our top priority. We are here to guide you through every purchase.</li>
                            </ul>
                        </div>

                        <div style={{ background: "rgba(139, 94, 60, 0.05)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                            <h3 style={{ marginBottom: "1rem" }}>Visit Us</h3>
                            <p><strong>Address:</strong> Shop No 1, Riddhi Park, Rajeev Gandhi Bhavan Signal, Sharanpur Road, Tilakwadi Corner, Nashik 2</p>
                            <p><strong>Phone:</strong> 9373499993</p>
                            <p><strong>Email:</strong> arihantsilver@gmail.com</p>
                        </div>

                        <div style={{ marginTop: "2rem", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14997.856672149743!2d73.7830858!3d19.9890244!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb3479b6889d%3A0xe22189ae5296b164!2sArihant%20Jewellers%20Antiques%20And%20Metal%20Art!5e0!3m2!1sen!2sin!4v1716543210987!5m2!1sen!2sin"
                                width="100%"
                                height="300"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Arihant Jewellers Location"
                            ></iframe>
                        </div>
                    </div>
                )}

                {activeTab === "terms" && (
                    <div className="fade-in">
                        <h3 style={{ color: "var(--color-primary)", marginBottom: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Terms and Conditions</h3>
                        <p>Welcome to Arihant Jewellers. By accessing this website and/or purchasing from us, you agree to be bound by the following terms and conditions.</p>

                        <h4 style={{ color: "#2980b9", marginTop: "1.5rem" }}>1. General Use</h4>
                        <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                            <li>The content of the pages of this website is subject to change without notice.</li>
                            <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose.</li>
                        </ul>

                        <h4 style={{ color: "#2980b9", marginTop: "1.5rem" }}>2. Intellectual Property</h4>
                        <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice.</p>

                        <div style={{ marginTop: "2rem", padding: "1rem", background: "#f9f9f9", borderRadius: "4px", fontSize: "0.9rem" }}>
                            <p>For the full legal text, please refer to our official documentation or contact us directly.</p>
                        </div>
                    </div>
                )}

                {activeTab === "privacy" && (
                    <div className="fade-in">
                        <h3 style={{ color: "var(--color-primary)", marginBottom: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Privacy Policy</h3>
                        <p>At Arihant Jewellers, we value your trust and are committed to protecting your personal information.</p>

                        <h4 style={{ color: "#2980b9", marginTop: "1.5rem" }}>Information We Collect</h4>
                        <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                            <li>Name and contact information including email address.</li>
                            <li>Demographic information such as postcode, preferences, and interests.</li>
                            <li>Other information relevant to customer surveys and/or offers.</li>
                        </ul>

                        <h4 style={{ color: "#2980b9", marginTop: "1.5rem" }}>Security</h4>
                        <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>
                    </div>
                )}

                {activeTab === "shipping" && (
                    <div className="fade-in">
                        <h3 style={{ color: "var(--color-primary)", marginBottom: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Shipping & Refund Policy</h3>

                        <h4 style={{ color: "#2980b9", marginTop: "1.5rem" }}>Shipping</h4>
                        <p>Orders are shipped within 'Not Applicable' or as per the delivery date agreed at the time of order confirmation. Arihant Jewellers is not liable for any delay in delivery by the courier company / postal authorities.</p>

                        <h4 style={{ color: "#2980b9", marginTop: "1.5rem" }}>Cancellations</h4>
                        <p>Cancellations will be considered only if the request is made within the <strong>Same day</strong> of placing the order. No cancellations are entertained for those products that the Arihant Jewellers marketing team has obtained on special occasions.</p>

                        <h4 style={{ color: "#2980b9", marginTop: "1.5rem" }}>Returns</h4>
                        <p>In case of receipt of damaged or defective items, please report the same to our Customer Service team within the <strong>Same day</strong> of receipt of the products.</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default About;
