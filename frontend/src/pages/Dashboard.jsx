import "./Dashboard.css";

import StatsCard from "../components/Cards/StatsCard";
import SprintCard from "../components/Cards/SprintCard";

import {
  RiTaskLine,
  RiInboxLine,
  RiTimerLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

function Dashboard() {
  return (
    <main className="dashboard">
      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <StatsCard
          title="Total Tickets"
          value="25"
          icon={<RiTaskLine />}
          bgColor="#EBF5FF"
          iconColor="#2563EB"
        />

        <StatsCard
          title="To Do"
          value="10"
          icon={<RiInboxLine />}
          bgColor="#F3F4F6"
          iconColor="#6B7280"
        />

        <StatsCard
          title="In Progress"
          value="6"
          icon={<RiTimerLine />}
          bgColor="#FEF3C7"
          iconColor="#D97706"
        />

        <StatsCard
          title="Done"
          value="5"
          icon={<RiCheckDoubleLine />}
          bgColor="#D1FAE5"
          iconColor="#059669"
        />
      </div>

     
    </main>
  );
}

export default Dashboard;