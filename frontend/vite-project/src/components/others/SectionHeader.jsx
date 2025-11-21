import PropTypes from "prop-types";
import "./section-header.css";

const SectionHeader = ({ title, subtitle, action }) => (
  <header className="section-header">
    <div>
      <p className="section-label">{subtitle}</p>
      <h2>{title}</h2>
    </div>
    {action && <div>{action}</div>}
  </header>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  action: PropTypes.node,
};

export default SectionHeader;

