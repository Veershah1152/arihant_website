import PropTypes from "prop-types";
import "./badge.css";

const Badge = ({ children, tone = "info" }) => (
  <span className={`badge badge--${tone}`}>{children}</span>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  tone: PropTypes.oneOf(["info", "success", "warning"]),
};

export default Badge;

