import PropTypes from "prop-types";
import "./button.css";

const PrimaryButton = ({ children, variant = "primary", icon, ...props }) => (
  <button className={`btn btn--${variant}`} {...props}>
    {icon && <span className="btn__icon">{icon}</span>}
    {children}
  </button>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "ghost", "outline"]),
  icon: PropTypes.node,
};

export default PrimaryButton;

