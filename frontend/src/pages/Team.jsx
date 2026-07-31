import { useState } from "react";
import "./Team.css";
import {
  RiUserAddLine,
  RiMailLine,
  RiCheckDoubleLine,
  RiTaskLine,
  RiCloseLine,
  RiSearchLine,
  RiShieldUserLine
} from "react-icons/ri";

const initialTeamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Frontend Engineer",
    email: "alex.chen@agiletrack.io",
    avatar: "AC",
    bgColor: "#2563eb",
    assignedTasks: 8,
    completedTasks: 18,
    status: "Online"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Senior Backend Architect",
    email: "sarah.j@agiletrack.io",
    avatar: "SJ",
    bgColor: "#7c3aed",
    assignedTasks: 12,
    completedTasks: 24,
    status: "Online"
  },
  {
    id: 3,
    name: "David Kim",
    role: "Full Stack Developer",
    email: "david.k@agiletrack.io",
    avatar: "DK",
    bgColor: "#059669",
    assignedTasks: 6,
    completedTasks: 15,
    status: "Offline"
  },
  {
    id: 4,
    name: "John Taylor",
    role: "UI/UX Lead Designer",
    email: "john.t@agiletrack.io",
    avatar: "JT",
    bgColor: "#d97706",
    assignedTasks: 5,
    completedTasks: 10,
    status: "Online"
  },
  {
    id: 5,
    name: "Emma Watson",
    role: "DevOps & Cloud Engineer",
    email: "emma.w@agiletrack.io",
    avatar: "EW",
    bgColor: "#0891b2",
    assignedTasks: 7,
    completedTasks: 19,
    status: "Online"
  },
  {
    id: 6,
    name: "Marcus Vance",
    role: "Product Manager",
    email: "marcus.v@agiletrack.io",
    avatar: "MV",
    bgColor: "#e11d48",
    assignedTasks: 4,
    completedTasks: 22,
    status: "Offline"
  }
];

function Team() {
  const [members, setMembers] = useState(initialTeamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "Frontend Developer",
    email: "",
    status: "Online",
    bgColor: "#2563eb"
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.email.trim()) return;

    const initials = newMember.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const created = {
      id: Date.now(),
      name: newMember.name,
      role: newMember.role,
      email: newMember.email,
      avatar: initials || "TM",
      bgColor: newMember.bgColor,
      assignedTasks: 0,
      completedTasks: 0,
      status: newMember.status
    };

    setMembers([created, ...members]);
    setIsAddModalOpen(false);
    setNewMember({
      name: "",
      role: "Frontend Developer",
      email: "",
      status: "Online",
      bgColor: "#2563eb"
    });
  };

  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <main className="team-page">
      {/* Header Section */}
      <div className="team-header">
        <button
          className="add-member-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          <RiUserAddLine /> Add Member
        </button>
      </div>

      {/* Grid of Team Cards */}
      <div className="team-grid">
        {filteredMembers.map((member) => (
          <div className="team-card" key={member.id}>
            {/* Online / Offline Status Badge */}
            <div className="card-top-bar">
              <span className={`status-dot-badge ${member.status.toLowerCase()}`}>
                <span className="dot-indicator"></span> {member.status}
              </span>
            </div>

            {/* Profile Image / Avatar */}
            <div
              className="member-profile-avatar"
              style={{ backgroundColor: member.bgColor }}
            >
              {member.avatar}
            </div>

            {/* Name & Role */}
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>

            {/* Email */}
            <div className="member-email-box">
              <RiMailLine /> <span>{member.email}</span>
            </div>

            {/* Tasks Metrics Stats */}
            <div className="member-task-stats">
              <div className="task-stat-col">
                <div className="stat-num-box">
                  <RiTaskLine className="stat-ic blue-ic" />
                  <span className="stat-num">{member.assignedTasks}</span>
                </div>
                <span className="stat-label">Assigned</span>
              </div>
              <div className="stat-divider"></div>
              <div className="task-stat-col">
                <div className="stat-num-box">
                  <RiCheckDoubleLine className="stat-ic green-ic" />
                  <span className="stat-num">{member.completedTasks}</span>
                </div>
                <span className="stat-label">Completed</span>
              </div>
            </div>

            {/* Action: View Profile */}
            <button
              className="view-profile-btn"
              onClick={() => setSelectedMember(member)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className="modal-backdrop">
          <div className="modal-container member-profile-modal">
            <div className="modal-header">
              <h2>Team Member Profile</h2>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedMember(null)}
              >
                <RiCloseLine />
              </button>
            </div>

            <div className="profile-modal-body">
              <div className="profile-hero-section">
                <div
                  className="profile-modal-avatar"
                  style={{ backgroundColor: selectedMember.bgColor }}
                >
                  {selectedMember.avatar}
                </div>
                <h3>{selectedMember.name}</h3>
                <p className="profile-hero-role">{selectedMember.role}</p>
                <span className={`status-dot-badge ${selectedMember.status.toLowerCase()}`}>
                  <span className="dot-indicator"></span> {selectedMember.status}
                </span>
              </div>

              <div className="profile-info-list">
                <div className="info-item">
                  <RiMailLine className="info-icon" />
                  <div>
                    <label>Email Address</label>
                    <p>{selectedMember.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <RiShieldUserLine className="info-icon" />
                  <div>
                    <label>Permissions & Access</label>
                    <p>Standard Member / Developer</p>
                  </div>
                </div>

                <div className="profile-stats-grid">
                  <div className="profile-stat-card">
                    <span className="p-stat-val">{selectedMember.assignedTasks}</span>
                    <span className="p-stat-lbl">Active Tasks</span>
                  </div>
                  <div className="profile-stat-card">
                    <span className="p-stat-val">{selectedMember.completedTasks}</span>
                    <span className="p-stat-lbl">Completed Tasks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="submit-btn"
                onClick={() => setSelectedMember(null)}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Add Team Member</h2>
              <button
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="modal-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emma Watson"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Role / Position *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Engineer"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. emma@agiletrack.io"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Initial Status</label>
                  <select
                    value={newMember.status}
                    onChange={(e) =>
                      setNewMember({ ...newMember, status: e.target.value })
                    }
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Avatar Color</label>
                  <select
                    value={newMember.bgColor}
                    onChange={(e) =>
                      setNewMember({ ...newMember, bgColor: e.target.value })
                    }
                  >
                    <option value="#2563eb">Blue</option>
                    <option value="#7c3aed">Purple</option>
                    <option value="#059669">Emerald</option>
                    <option value="#d97706">Amber</option>
                    <option value="#0891b2">Cyan</option>
                    <option value="#e11d48">Rose</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Team;