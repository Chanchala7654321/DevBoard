import { useState, useReducer } from "react";
import "./MyTasks.css";
import {
  RiSearchLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiCalendarEventLine,
  RiFlag2Line,
  RiCloseLine,
  RiFilter3Line
} from "react-icons/ri";

const initialTasks = [
  {
    id: "AG-1001",
    title: "Design Login & Registration Pages",
    description: "Create responsive UI components with form validation and password strength meter.",
    priority: "High",
    status: "progress",
    dueDate: "2026-08-05",
    assignee: "Alex Chen",
    avatar: "AC"
  },
  {
    id: "AG-1002",
    title: "Refactor Axios API Services",
    description: "Consolidate axios instances, request interceptors, and global error handling.",
    priority: "Medium",
    status: "todo",
    dueDate: "2026-08-08",
    assignee: "Alex Chen",
    avatar: "AC"
  },
  {
    id: "AG-1004",
    title: "JWT Authentication & Route Guards",
    description: "Implement secure token storage, refresh logic, and protected route wrapper.",
    priority: "Critical",
    status: "blocked",
    dueDate: "2026-08-12",
    assignee: "Alex Chen",
    avatar: "AC"
  },
  {
    id: "AG-1005",
    title: "Responsive Mobile Navigation Drawer",
    description: "Optimize sidebar for tablet and mobile viewports with smooth touch gestures.",
    priority: "Low",
    status: "review",
    dueDate: "2026-08-06",
    assignee: "Alex Chen",
    avatar: "AC"
  },
  {
    id: "AG-1006",
    title: "Deploy Production Build Pipeline",
    description: "Set up GitHub Actions CI/CD workflow pipeline for automated Vercel deployments.",
    priority: "Medium",
    status: "done",
    dueDate: "2026-08-01",
    assignee: "Alex Chen",
    avatar: "AC"
  },
  {
    id: "AG-1007",
    title: "Dark Mode Theme Persistence",
    description: "Add persistent color scheme preference toggle using CSS custom properties.",
    priority: "Low",
    status: "todo",
    dueDate: "2026-08-15",
    assignee: "Alex Chen",
    avatar: "AC"
  },
  {
    id: "AG-1008",
    title: "Sprint Retrospective Analytics Card",
    description: "Build interactive data charts summarizing sprint velocity and ticket completion rate.",
    priority: "High",
    status: "progress",
    dueDate: "2026-08-18",
    assignee: "Alex Chen",
    avatar: "AC"
  },
  {
    id: "AG-1009",
    title: "Notification Banner & Toast Container",
    description: "Add floating notification stack component for optimistic action feedback.",
    priority: "Medium",
    status: "review",
    dueDate: "2026-08-20",
    assignee: "Alex Chen",
    avatar: "AC"
  }
];

function taskReducer(state, action) {
  switch (action.type) {
    case "READ":
      return action.payload;
    case "CREATE":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

function MyTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "todo",
    dueDate: "",
    assignee: "Alex Chen",
    avatar: "AC"
  });

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setFormData({
      id: `AG-${Math.floor(1000 + Math.random() * 9000)}`,
      title: "",
      description: "",
      priority: "Medium",
      status: "todo",
      dueDate: new Date().toISOString().split("T")[0],
      assignee: "Alex Chen",
      avatar: "AC"
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({ ...task });
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "DELETE", payload: id });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTask) {
      dispatch({ type: "UPDATE", payload: formData });
    } else {
      dispatch({ type: "CREATE", payload: formData });
    }

    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "todo":
        return <span className="status-pill status-todo">To Do</span>;
      case "progress":
        return <span className="status-pill status-progress">In Progress</span>;
      case "blocked":
        return <span className="status-pill status-blocked">Blocked</span>;
      case "review":
        return <span className="status-pill status-review">Review</span>;
      case "done":
        return <span className="status-pill status-done">Done</span>;
      default:
        return <span className="status-pill">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    const p = priority?.toLowerCase();
    return (
      <span className={`priority-pill priority-${p}`}>
        <RiFlag2Line /> {priority}
      </span>
    );
  };

  return (
    <main className="mytasks-page">
      {/* Header Title Section */}
      <div className="page-header">
        <button className="add-task-primary-btn" onClick={handleOpenAddModal}>
          <RiAddLine /> Add Task
        </button>
      </div>

     


      {/* Responsive Grid of Task Cards (4 per row on desktop) */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><RiFilter3Line /></div>
          <h3>No tasks found</h3>
          <p>Try adjusting your search query or filter selection.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <div className="task-card" key={task.id}>
              {/* Card UP SIDE Header: ID & Priority on Left, EDIT & DELETE Buttons on UP SIDE Right */}
              <div className="task-card-header">
                <div className="task-header-left">
                  <span className="task-id">{task.id}</span>
                  {getPriorityBadge(task.priority)}
                </div>

                {/* Edit & Delete Buttons positioned on UP SIDE */}
                <div className="task-action-btns">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleOpenEditModal(task)}
                    title="Edit Task"
                  >
                    <RiEditLine /> Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Delete Task"
                  >
                    <RiDeleteBin6Line /> Delete
                  </button>
                </div>
              </div>

              {/* Card Title & Description */}
              <h3 className="task-title">{task.title}</h3>
              <p className="task-desc">{task.description}</p>

              {/* Status & Meta Info */}
              <div className="task-meta-row">
                <div className="task-status">{getStatusBadge(task.status)}</div>
                <div className="task-due-date">
                  <RiCalendarEventLine />
                  <span>{task.dueDate}</span>
                </div>
              </div>

              {/* Card Footer: Assignee Avatar */}
              <div className="task-card-footer">
                <div className="assignee-avatar" title={`Assigned to ${task.assignee}`}>
                  {task.avatar}
                </div>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}>{task.assignee}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog for Create & Edit */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Task ID</label>
                <input type="text" value={formData.id} disabled readOnly />
              </div>

              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design Navigation Menu"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Provide task summary details..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="todo">To Do</option>
                    <option value="progress">In Progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyTasks;