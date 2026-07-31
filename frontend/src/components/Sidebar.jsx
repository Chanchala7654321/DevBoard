import "./Sidebar.css";

import {
  RiRocketLine,
  RiDashboardLine,
  RiLayoutColumnLine,
  RiTaskLine,
  RiFolderLine,
  RiTeamLine,
  RiMailLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RiDashboardLine />,
    active: true,
  },
  {
    id: 2,
    title: "Board",
    icon: <RiLayoutColumnLine />,
  },
  {
    id: 3,
    title: "My Tasks",
    icon: <RiTaskLine />,
  },
  {
    id: 4,
    title: "Projects",
    icon: <RiFolderLine />,
  },
  {
    id: 5,
    title: "Team",
    icon: <RiTeamLine />,
  },
  {
    id: 8,
    title: "Contact",
    icon: <RiMailLine />,
  },

];

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}

      <div className="sidebar-logo">
        <div className="logo-box">
          <RiRocketLine />
        </div>

        <h2>AgileTrack</h2>
      </div>

      {/* Navigation */}

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <a
            href="/"
            key={item.id}
            className={item.active ? "menu-item active" : "menu-item"}
          >
            {item.icon}

            <span>{item.title}</span>
          </a>
        ))}
      </nav>

      {/* Footer */}

      <div className="sidebar-footer">
        <button className="logout-btn">
          <RiLogoutBoxLine />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;