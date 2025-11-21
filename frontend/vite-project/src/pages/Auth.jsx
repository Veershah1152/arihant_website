import PrimaryButton from "../components/buttons/PrimaryButton";
import SectionHeader from "../components/others/SectionHeader";

const Auth = () => (
  <section id="auth" className="page-section">
    <SectionHeader
      title="Login & Signup states"
      subtitle="Login & Signup"
      action={<PrimaryButton variant="ghost">Need help?</PrimaryButton>}
    />
    <div className="two-column">
      <div className="panel">
        <h3>Welcome back</h3>
        <p className="muted">Sign in to manage your orders.</p>
        <div className="section-grid">
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
        </div>
        <PrimaryButton>Login</PrimaryButton>
      </div>
      <div className="panel">
        <h3>Create account</h3>
        <p className="muted">Save carts and track shipping.</p>
        <div className="section-grid">
          <label>
            Full Name
            <input type="text" placeholder="Jane Doe" />
          </label>
          <label>
            Email
            <input type="email" placeholder="jane@design.co" />
          </label>
          <label>
            Password
            <input type="password" placeholder="At least 8 characters" />
          </label>
        </div>
        <PrimaryButton variant="outline">Create Account</PrimaryButton>
      </div>
    </div>
  </section>
);

export default Auth;

