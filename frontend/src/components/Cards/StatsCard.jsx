import "./StatsCard.css";

function StatsCard({ title, value, icon, bgColor, iconColor }) {
  return (
    <div className="stats-card">
      <div className="stats-header">

        <span className="stats-title">
          {title}
        </span>

        <div
          className="stats-icon"
          style={{
            backgroundColor: bgColor,
            color: iconColor,
          }}
        >
          {icon}
        </div>

      </div>

      <h2 className="stats-value">{value}</h2>

    </div>
  );
}

export default StatsCard;