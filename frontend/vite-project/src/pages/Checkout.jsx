import SectionHeader from "../components/others/SectionHeader";
import PrimaryButton from "../components/buttons/PrimaryButton";

const steps = [
  { title: "Shipping", detail: "Select address & delivery window" },
  { title: "Payment", detail: "Card, UPI, PayPal" },
  { title: "Review", detail: "Apply codes & confirm" },
];

const Checkout = () => (
  <section id="checkout" className="page-section">
    <SectionHeader
      title="Linear checkout steps"
      subtitle="Checkout"
      action={<PrimaryButton variant="outline">Save Draft</PrimaryButton>}
    />
    <div className="timeline">
      {steps.map((step, index) => (
        <div key={step.title} className="timeline-step">
          <p className="pill pill--info">Step {index + 1}</p>
          <h4>{step.title}</h4>
          <p className="muted">{step.detail}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Checkout;

