import React from 'react';
import SectionHeader from "../components/others/SectionHeader";

const LegalPolicies = () => {
    return (
        <section className="page-section">
            <SectionHeader title="Legal Policies" subtitle="Terms, Privacy, Shipping & Refunds" />

            <div className="panel" style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", color: "#333" }}>
                <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "5px", marginBottom: "30px", fontSize: "0.9em" }}>
                    <p><strong>Last Updated:</strong> Nov 24 2025</p>
                    <p><strong>Business Name:</strong> Arihant Jewellers</p>
                    <p><strong>Address:</strong> Shop no.7, Bhanuprasad Apt. Advait Colony, Survey no.719, Canada Corner, Nashik, Nashik, Maharashtra, 422005</p>
                    <p><strong>Contact:</strong> 9373499993 | <a href="mailto:arihantsilver@gmail.com">arihantsilver@gmail.com</a></p>
                </div>

                <section id="terms" style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#d35400", marginTop: "30px", fontSize: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Terms and Conditions</h2>
                    <p>Welcome to Arihant Jewellers. By accessing this website and/or purchasing from us, you agree to be bound by the following terms and conditions.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>1. General Use</h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>The content of the pages of this website is subject to change without notice.</li>
                        <li style={{ marginBottom: "8px" }}>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                        <li style={{ marginBottom: "8px" }}>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>2. Intellectual Property</h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                        <li style={{ marginBottom: "8px" }}>All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>3. External Links</h3>
                    <p>From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s). You may not create a link to this website from another website or document without Arihant Jewellers' prior written consent.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>4. Payments & Liability</h3>
                    <p>We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>5. Governing Law</h3>
                    <p>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</p>
                </section>

                <section id="shipping" style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#d35400", marginTop: "30px", fontSize: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Shipping & Delivery Policy</h2>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>International Shipping</h3>
                    <p>For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>Domestic Shipping</h3>
                    <p>For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>Timelines & Liability</h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>Orders are shipped within <strong>'Not Applicable'</strong> or as per the delivery date agreed at the time of order confirmation.</li>
                        <li style={{ marginBottom: "8px" }}>Arihant Jewellers hands over the consignment to the courier company or postal authorities within <strong>'Not Applicable'</strong> days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.</li>
                        <li style={{ marginBottom: "8px" }}>Arihant Jewellers is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within the agreed timeframe.</li>
                        <li style={{ marginBottom: "8px" }}>Delivery of all orders will be to the address provided by the buyer.</li>
                        <li style={{ marginBottom: "8px" }}>Delivery of our services will be confirmed on your mail ID as specified during registration.</li>
                    </ul>
                </section>

                <section id="refunds" style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#d35400", marginTop: "30px", fontSize: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Cancellation & Refund Policy</h2>
                    <p>We strive to ensure you are satisfied with your purchase. However, if you need to cancel or return an item, please review the following policy.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>Cancellations</h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>Cancellations will be considered only if the request is made within the <strong>Same day</strong> of placing the order.</li>
                        <li style={{ marginBottom: "8px" }}>However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
                        <li style={{ marginBottom: "8px" }}>No cancellations are entertained for those products that the Arihant Jewellers marketing team has obtained on special occasions like Pongal, Diwali, Valentine’s Day, etc. These are limited occasion offers and therefore cancellations are not possible.</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>Returns & Refunds</h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}><strong>Perishable Items:</strong> We do not accept cancellation requests for perishable items. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
                        <li style={{ marginBottom: "8px" }}><strong>Damaged or Defective Items:</strong> In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within the <strong>Same day</strong> of receipt of the products.</li>
                        <li style={{ marginBottom: "8px" }}><strong>Product Not As Expected:</strong> In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within the <strong>Same day</strong> of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
                        <li style={{ marginBottom: "8px" }}><strong>Warranty:</strong> In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>Refund Processing</h3>
                    <p>Once a refund is approved by Arihant Jewellers, it will be processed within <strong>1–2 days</strong>.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>How to Request a Refund / Cancellation</h3>
                    <ol style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>Contact us via email at <strong>arihantsilver@gmail.com</strong> or phone at <strong>9373499993</strong>.</li>
                        <li style={{ marginBottom: "8px" }}>Provide your Order ID and the reason for the request.</li>
                        <li style={{ marginBottom: "8px" }}>For damaged items, please attach clear photographs of the product and packaging.</li>
                        <li style={{ marginBottom: "8px" }}>Wait for our team to review and authorize the return/cancellation.</li>
                    </ol>
                </section>

                <section id="privacy" style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#d35400", marginTop: "30px", fontSize: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Privacy Policy</h2>
                    <p>At Arihant Jewellers, we value your trust and are committed to protecting your personal information.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>1. Information We Collect</h3>
                    <p>We may collect the following information:</p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>Name and Job title.</li>
                        <li style={{ marginBottom: "8px" }}>Contact information including email address and phone number.</li>
                        <li style={{ marginBottom: "8px" }}>Demographic information such as postcode, preferences, and interests.</li>
                        <li style={{ marginBottom: "8px" }}>Payment details (processed securely via third-party gateways).</li>
                        <li style={{ marginBottom: "8px" }}>Order history and transaction records.</li>
                        <li style={{ marginBottom: "8px" }}>Technical data such as IP address, browser type, and cookies.</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>2. Purpose of Processing</h3>
                    <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>Internal record keeping.</li>
                        <li style={{ marginBottom: "8px" }}>Processing your orders, shipping, and payments.</li>
                        <li style={{ marginBottom: "8px" }}>Fraud prevention and security.</li>
                        <li style={{ marginBottom: "8px" }}>Improving our products and services.</li>
                        <li style={{ marginBottom: "8px" }}>Sending promotional emails about new products, special offers, or other information which we think you may find interesting (only if you have consented).</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>3. Third Parties</h3>
                    <p>We do not sell your data. However, we may share necessary data with trusted third parties to fulfill our services:</p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}><strong>Payment Gateways:</strong> To process secure transactions.</li>
                        <li style={{ marginBottom: "8px" }}><strong>Courier Partners:</strong> To deliver your orders.</li>
                        <li style={{ marginBottom: "8px" }}><strong>Analytics Providers:</strong> To help us understand website traffic and usage.</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>4. Cookies</h3>
                    <p>A cookie is a small file which asks permission to be placed on your computer's hard drive. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>5. Your Rights</h3>
                    <p>Under applicable laws, you have the right to:</p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}>Access the personal data we hold about you.</li>
                        <li style={{ marginBottom: "8px" }}>Request correction of incorrect data.</li>
                        <li style={{ marginBottom: "8px" }}>Request deletion of your data (subject to legal retention requirements).</li>
                        <li style={{ marginBottom: "8px" }}>Withdraw consent for marketing communications.</li>
                    </ul>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>6. Data Retention</h3>
                    <p>We retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>7. Security</h3>
                    <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online. However, no method of transmission over the internet is 100% secure.</p>

                    <h3 style={{ color: "#2980b9", marginTop: "20px", fontSize: "1.2rem" }}>8. Contact Us</h3>
                    <p>If you have any questions regarding this Privacy Policy, please contact us:</p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "8px" }}><strong>Email:</strong> arihantsilver@gmail.com</li>
                        <li style={{ marginBottom: "8px" }}><strong>Phone:</strong> 9373499993</li>
                        <li style={{ marginBottom: "8px" }}><strong>Address:</strong> Shop no.7, Bhanuprasad Apt. Advait Colony, Survey no.719, Canada Corner, Nashik, Nashik, Maharashtra, 422005</li>
                    </ul>
                </section>

                <section id="faq" style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#d35400", marginTop: "30px", fontSize: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Frequently Asked Questions (FAQ)</h2>
                    <p><strong>Q: How long does shipping take?</strong><br />
                        A: Orders are shipped as per the agreed timeline at confirmation. Domestic and international orders are handled via registered couriers.</p>

                    <p style={{ marginTop: "10px" }}><strong>Q: Can I return a product if I don't like it?</strong><br />
                        A: You must report any issues within the <strong>Same day</strong> of receipt. Our team will review the request and decide accordingly.</p>

                    <p style={{ marginTop: "10px" }}><strong>Q: What if my item arrives damaged?</strong><br />
                        A: Please report damaged items within the <strong>Same day</strong> of delivery with photos. We will inspect and assist you.</p>

                    <p style={{ marginTop: "10px" }}><strong>Q: How do I delete my data?</strong><br />
                        A: Please contact us at arihantsilver@gmail.com to request data deletion or access to your information.</p>
                </section>

                <div style={{ fontSize: "0.85em", color: "#7f8c8d", marginTop: "50px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
                    <p><strong>Legal Disclaimer:</strong> This document is for informational purposes only and does not constitute legal advice. We recommend consulting with a legal professional to ensure full compliance with local laws and regulations.</p>
                    <p><strong>GSTIN:</strong> 27ASWPS1521L1Z3 | <strong>Company Registration No.:</strong> 27ASWPS1521L1Z3</p>
                    <p><strong>Data Protection Officer:</strong> For any privacy-related concerns, contact <a href="mailto:arihantsilver@gmail.com">arihantsilver@gmail.com</a> or 9373499993.</p>
                </div>
            </div>
        </section>
    );
};

export default LegalPolicies;
