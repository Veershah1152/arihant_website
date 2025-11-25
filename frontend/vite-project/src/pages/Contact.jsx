import SectionHeader from "../components/others/SectionHeader";

const Contact = () => {
    const contactInfo = {
        email: "arihantsilver@gmail.com",
        phone: "9373499993",
        address: "Shop No 1, Riddhi Park, Rajeev Gandhi Bhavan Signal, Sharanpur Road, Tilakwadi Corner, Nashik 2",
        instagram: "https://www.instagram.com/arihantjwels?igsh=MXJrc2l6c2YwMml6cg==",
        facebook: "https://www.facebook.com/yourstore",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14997.856672149743!2d73.7830858!3d19.9890244!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb3479b6889d%3A0xe22189ae5296b164!2sArihant%20Jewellers%20Antiques%20And%20Metal%20Art!5e0!3m2!1sen!2sin!4v1716543210987!5m2!1sen!2sin"
    };

    return (
        <section className="page-section">
            <SectionHeader
                title="Get in Touch"
                subtitle="We'd love to hear from you"
            />

            {/* Contact Info Cards */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                marginBottom: "3rem"
            }}>
                {/* Email Card */}
                <div className="panel" style={{ textAlign: "center", padding: "2rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📧</div>
                    <h3 style={{ marginBottom: "0.5rem" }}>Email Us</h3>
                    <p className="muted" style={{ marginBottom: "1rem" }}>Send us an email anytime</p>
                    <a
                        href={`mailto:${contactInfo.email}`}
                        style={{
                            color: "var(--color-primary)",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        {contactInfo.email}
                    </a>
                </div>

                {/* Phone Card */}
                <div className="panel" style={{ textAlign: "center", padding: "2rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📞</div>
                    <h3 style={{ marginBottom: "0.5rem" }}>Call Us</h3>
                    <p className="muted" style={{ marginBottom: "1rem" }}>Mon-Sat, 9AM-6PM IST</p>
                    <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                        style={{
                            color: "var(--color-primary)",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        {contactInfo.phone}
                    </a>
                </div>

                {/* Address Card */}
                <div className="panel" style={{ textAlign: "center", padding: "2rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📍</div>
                    <h3 style={{ marginBottom: "0.5rem" }}>Visit Us</h3>
                    <p className="muted" style={{ marginBottom: "1rem" }}>Our office location</p>
                    <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                        {contactInfo.address}
                    </p>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="panel" style={{ marginBottom: "3rem", textAlign: "center", padding: "2.5rem" }}>
                <h2 style={{ marginBottom: "1rem" }}>Follow Us on Social Media</h2>
                <p className="muted" style={{ marginBottom: "2rem" }}>
                    Stay connected and get the latest updates
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    {/* Instagram */}
                    <a
                        href={contactInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "1rem 2rem",
                            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                            color: "#fff",
                            textDecoration: "none",
                            borderRadius: "12px",
                            fontWeight: "600",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                    </a>

                    {/* Facebook */}
                    <a
                        href={contactInfo.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "1rem 2rem",
                            background: "#1877f2",
                            color: "#fff",
                            textDecoration: "none",
                            borderRadius: "12px",
                            fontWeight: "600",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                    </a>
                </div>
            </div>

            {/* Map Section */}
            <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "2rem", paddingBottom: "1rem" }}>
                    <h2 style={{ marginBottom: "0.5rem" }}>Find Us on the Map</h2>
                    <p className="muted">Visit our store or office location</p>
                </div>
                <div style={{ width: "100%", height: "450px" }}>
                    <iframe
                        src={contactInfo.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Store Location"
                    ></iframe>
                </div>
            </div>

            {/* Business Hours */}
            <div className="panel" style={{ marginTop: "2rem", padding: "2rem", textAlign: "center" }}>
                <h3 style={{ marginBottom: "1.5rem" }}>Business Hours</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", maxWidth: "800px", margin: "0 auto" }}>
                    <div>
                        <p className="muted">Monday - Sunday</p>
                        <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>10:00 AM - 9:00 PM</p>
                    </div>
                    <div>
                        <p className="muted">Tuesday</p>
                        <p style={{ fontWeight: "600", fontSize: "1.1rem", color: "#ef4444" }}>Closed (and occasionally)</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
