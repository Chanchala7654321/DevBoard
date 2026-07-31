import "./Header.css";

import {
  RiMenuLine,
  RiSearchLine,
  RiNotification3Line,
  RiArrowDownSLine,
} from "react-icons/ri";

function Header() {
  return (
    <header className="header">
      {/* Left */}

      <div className="header-left">
        <button className="menu-btn">
          <RiMenuLine />
        </button>

        <h2>Dashboard</h2>
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