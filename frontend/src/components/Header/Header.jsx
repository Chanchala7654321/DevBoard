import "./Header.css";
import { useLocation } from "react-router-dom";

import {
  RiMenuLine,
  RiSearchLine,
  RiNotification3Line,
  RiArrowDownSLine,
} from "react-icons/ri";

function getPageTitle(pathname) {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/board":
      return "Board";
    case "/my-tasks":
      return "My Tasks";
    case "/projects":
      return "Projects";
    case "/team":
      return "Team";
    case "/contact":
      return "Contact Us";
    default:
      return "Dashboard";
  }
}

function Header({ onToggleSidebar }) {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="header">
      {/* Left */}
      <div className="header-left">

        <h2>{pageTitle}</h2>
      </div>

      {/* Right */}
      <div className="header-right">
        {/* Search */}
        <div className="search-box">
          <RiSearchLine className="search-icon" />

          <input
            type="text"
            placeholder="Search tickets..."
          />

          <kbd>/</kbd>
        </div>

        {/* Notification */}
        <button className="notification-btn">
          <RiNotification3Line />

          <span className="dot"></span>
        </button>

        {/* Profile */}
        <div className="profile">
          <div className="avatar">
            AC
          </div>

          <span className="name">
            Alex Chen
          </span>

          <RiArrowDownSLine />
        </div>
      </div>
    </header>
  );
}

export default Header;