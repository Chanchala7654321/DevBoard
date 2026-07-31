import { useState } from "react";
import "./Projects.css";
import {
  RiAddLine,
  RiFolder3Line,
  RiCalendarEventLine,
  RiCheckDoubleLine,
  RiArrowRightLine,
  RiTeamLine,
  RiCloseLine
} from "react-icons/ri";

const initialProjects = [
  {
    id: 1,
    name: "AgileTrack Core Dashboard",
    description: "Enterprise issue tracking system with custom Kanban boards and real-time sprint velocity analytics.",
    color: "#2563eb", // Blue
    status: "Active",
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
    deadline: "2026-09-15",
    team: [
      { name: "Alex Chen", avatar: "AC" },
      { name: "Sarah Johnson", avatar: "SJ" },
      { name: "David Kim", avatar: "DK" },
      { name: "John Taylor", avatar: "JT" }
    ]
  },
  {
    id: 2,
    name: "E-Commerce Checkout & Pay",
    description: "Revamping store checkout funnel with Stripe 3D-Secure 2.0 integration and multi-currency support.",
    color: "#7c3aed", // Purple
    status: "In Progress",
    progress: 45,
    totalTasks: 30,
    completedTasks: 14,
    deadline: "2026-10-01",
    team: [
      { name: "Sarah Johnson", avatar: "SJ" },
      { name: "David Kim", avatar: "DK" },
      { name: "Alex Chen", avatar: "AC" }
    ]
  },
  {
    id: 3,
    name: "Mobile Companion App",
    description: "Cross-platform React Native mobile application for iOS & Android with offline sync capabilities.",
    color: "#059669", // Emerald
    status: "Planning",
    progress: 20,
    totalTasks: 15,
    completedTasks: 3,
    deadline: "2026-11-20",
    team: [
      { name: "David Kim", avatar: "DK" },
      { name: "John Taylor", avatar: "JT" }
    ]
  },
  {
    id: 4,
    name: "AI Copilot Integration",
    description: "Integrating LLM assistant APIs for automated PR code reviews and intelligent ticket triage.",
    color: "#d97706", // Amber
    status: "Active",
    progress: 90,
    totalTasks: 10,
    completedTasks: 9,
    deadline: "2026-08-30",
    team: [
      { name: "Alex Chen", avatar: "AC" },
      { name: "John Taylor", avatar: "JT" }
    ]
  },
  {
    id: 5,
    name: "SOC2 Security Audit & Pen-Test",
    description: "End-to-end security penetration testing, dependency vulnerability remediation, and compliance audit.",
    color: "#e11d48", // Rose
    status: "Completed",
    progress: 100,
    totalTasks: 12,
    completedTasks: 12,
    deadline: "2026-07-25",
    team: [
      { name: "Sarah Johnson", avatar: "SJ" },
      { name: "Alex Chen", avatar: "AC" }
    ]
  },
  {
    id: 6,
    name: "Design System & Tokens",
    description: "Creating unified accessible React component library with Storybook documentation and tokens.",
    color: "#0891b2", // Cyan
    status: "In Progress",
    progress: 60,
    totalTasks: 20,
    completedTasks: 12,
    deadline: "2026-09-30",
    team: [
      { name: "John Taylor", avatar: "JT" },
      { name: "David Kim", avatar: "DK" }
    ]
  }
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "Active",
    deadline: "",
    color: "#2563eb"
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const created = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description || "No description provided.",
      color: newProject.color,
      status: newProject.status,
      progress: 0,
      totalTasks: 0,
      completedTasks: 0,
      deadline: newProject.deadline || new Date().toISOString().split("T")[0],
      team: [{ name: "Alex Chen", avatar: "AC" }]
    };

    setProjects([created, ...projects]);
    setIsNewProjectModalOpen(false);
    setNewProject({
      name: "",
      description: "",
      status: "Active",
      deadline: "",
      color: "#2563eb"
    });
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "p-status-active";
      case "in progress":
        return "p-status-progress";
      case "completed":
        return "p-status-completed";
      case "planning":
        return "p-status-planning";
      default:
        return "";
    }
  };

  return (
    <main className="projects-page">
      {/* Page Header */}
      <div className="projects-header">
        <button
          className="new-project-btn"
          onClick={() => setIsNewProjectModalOpen(true)}
        >
          <RiAddLine /> New Project
        </button>
      </div>

      {/* Grid of Colorful Project Cards (3-4 per row on desktop) */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            className="project-card"
            key={project.id}
            style={{ "--card-accent-color": project.color }}
          >
            {/* Color Accent Top Bar */}
            <div
              className="project-accent-bar"
              style={{ backgroundColor: project.color }}
            ></div>

            <div className="project-card-inner">
              {/* Header: Title & Status */}
              <div className="project-card-top">
                <div className="project-icon-title">
                  <div
                    className="project-icon-box"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color
                    }}
                  >
                    <RiFolder3Line />
                  </div>
                  <h3 className="project-name">{project.name}</h3>
                </div>
                <span className={`project-status-badge ${getStatusClass(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Short Description */}
              <p className="project-description">{project.description}</p>

              {/* Progress Section */}
              <div className="project-progress-section">
                <div className="progress-labels">
                  <span className="progress-title">Progress</span>
                  <span className="progress-percentage">{project.progress}%</span>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.color
                    }}
                  ></div>
                </div>
              </div>

              
              

              {/* Card Footer: Team Avatars & View Details */}
              <div className="project-card-footer">
                

                <button
                  className="view-details-btn"
                  onClick={() => setSelectedProjectDetails(project)}
                >
                  View Details <RiArrowRightLine />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProjectDetails && (
        <div className="modal-backdrop">
          <div className="modal-container project-details-modal">
            <div className="modal-header">
              <div className="modal-title-row">
                <div
                  className="project-icon-box"
                  style={{
                    backgroundColor: `${selectedProjectDetails.color}20`,
                    color: selectedProjectDetails.color
                  }}
                >
                  <RiFolder3Line />
                </div>
                <h2>{selectedProjectDetails.name}</h2>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProjectDetails(null)}
              >
                <RiCloseLine />
              </button>
            </div>

            <div className="project-details-body">
              <p className="details-desc">{selectedProjectDetails.description}</p>
              
              <div className="details-grid">
                <div className="details-box">
                  <span className="details-label">Status</span>
                  <span className={`project-status-badge ${getStatusClass(selectedProjectDetails.status)}`}>
                    {selectedProjectDetails.status}
                  </span>
                </div>

                <div className="details-box">
                  <span className="details-label">Completion</span>
                  <span className="details-val">{selectedProjectDetails.progress}%</span>
                </div>

                <div className="details-box">
                  <span className="details-label">Total Tasks</span>
                  <span className="details-val">{selectedProjectDetails.completedTasks} / {selectedProjectDetails.totalTasks}</span>
                </div>

                <div className="details-box">
                  <span className="details-label">Deadline</span>
                  <span className="details-val">{selectedProjectDetails.deadline}</span>
                </div>
              </div>

              <div className="details-team-section">
                <h4>Team Members</h4>
                <div className="details-team-list">
                  {selectedProjectDetails.team.map((m, i) => (
                    <div key={i} className="team-member-pill">
                      <div className="team-avatar-circle">{m.avatar}</div>
                      <span>{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="submit-btn"
                onClick={() => setSelectedProjectDetails(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Creation Modal */}
      {isNewProjectModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button
                className="modal-close-btn"
                onClick={() => setIsNewProjectModalOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="modal-form">
              <div className="form-group">
                <label>Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AgileTrack Mobile App"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Short summary of project scope..."
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) =>
                      setNewProject({ ...newProject, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Theme Color</label>
                  <select
                    value={newProject.color}
                    onChange={(e) =>
                      setNewProject({ ...newProject, color: e.target.value })
                    }
                  >
                    <option value="#2563eb">Blue</option>
                    <option value="#7c3aed">Purple</option>
                    <option value="#059669">Emerald</option>
                    <option value="#d97706">Amber</option>
                    <option value="#e11d48">Rose</option>
                    <option value="#0891b2">Cyan</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Deadline Date</label>
                <input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) =>
                    setNewProject({ ...newProject, deadline: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsNewProjectModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Projects;