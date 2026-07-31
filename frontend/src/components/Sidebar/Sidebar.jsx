import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  RiRocketLine,
  RiDashboardLine,
  RiLayoutColumnLine,
  RiTaskLine,
  RiFolderLine,
  RiTeamLine,
  RiMailLine,
  RiLogoutBoxLine,
  RiCloseLine,
} from "react-icons/ri";

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: <RiDashboardLine />,
  },
  {
    id: 2,
    title: "Board",
    path: "/board",
    icon: <RiLayoutColumnLine />,
  },
  {
    id: 3,
    title: "My Tasks",
    path: "/my-tasks",
    icon: <RiTaskLine />,
  },
  {
    id: 4,
    title: "Projects",
    path: "/projects",
    icon: <RiFolderLine />,
  },
  {
    id: 5,
    title: "Team",
    path: "/team",
    icon: <RiTeamLine />,
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
    icon: <RiMailLine />,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo & Mobile Close Button */}
        <div className="sidebar-logo">
          <div className="logo-box">
            <RiRocketLine />
          </div>

          <h2>AgileTrack</h2>

          <button className="sidebar-close-btn" onClick={onClose} title="Close Sidebar">
            <RiCloseLine />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onClose}>
            <RiLogoutBoxLine />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;