import SectionHeader from "../components/others/SectionHeader";
import Badge from "../components/others/Badge";

const upcomingDeliveries = [
  { id: "INV-9321", eta: "Arriving Friday", status: "On the way" },
  { id: "INV-9322", eta: "Processing", status: "Preparing" },
];

const loyalty = [
  { label: "Tier", value: "Gold" },
  { label: "Points", value: "4,320" },
  { label: "Reward Credit", value: "$86.00" },
];

const UserDashboard = () => (
  <section id="user-dashboard" className="page-section">
    <SectionHeader
      title="Customer dashboard widgets"
      subtitle="User Dashboard"
      action={<Badge tone="success">Synced</Badge>}
    />
    <div className="two-column">
      <div className="panel">
        <h3>Deliveries</h3>
        <ul className="list">
          {upcomingDeliveries.map((delivery) => (
            <li key={delivery.id} className="list-item">
              <div>
                <strong>{delivery.id}</strong>
                <p className="muted">{delivery.eta}</p>
              </div>
              <Badge tone="info">{delivery.status}</Badge>
            </li>
          ))}
        </ul>
      </div>
      <div className="panel stats-grid">
        {loyalty.map((item) => (
          <div key={item.label}>
            <p className="muted">{item.label}</p>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UserDashboard;

