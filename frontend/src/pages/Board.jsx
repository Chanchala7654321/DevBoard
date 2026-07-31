import "./Board.css";
import { useEffect, useReducer, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/taskService";
import Column from "./Column";
import TaskForm from "../components/TaskForm/TaskForm";

const defaultTasks = [
  {
    id: "MOB-3002",
    title: "Add biometric authentication support",
    description: "Implement fingerprint and FaceID auth flow for mobile app.",
    status: "todo",
    priority: "High",
    storyPoints: 5,
    dueDate: "2026-08-06",
    assignee: "Sarah Johnson",
    avatar: "SJ",
    labels: ["feature", "security"]
  },
  {
    id: "AG-1001",
    title: "Design Login Page & Authentication UI",
    description: "Create accessible login screen with responsive layout.",
    status: "todo",
    priority: "High",
    storyPoints: 3,
    dueDate: "2026-08-05",
    assignee: "Alex Chen",
    avatar: "AC",
    labels: ["feature", "ui"]
  },
  {
    id: "AG-1003",
    title: "Dashboard Statistics & API Integration",
    description: "Fetch dashboard analytics from backend API.",
    status: "progress",
    priority: "High",
    storyPoints: 8,
    dueDate: "2026-08-10",
    assignee: "David Kim",
    avatar: "DK",
    labels: ["api", "dashboard"]
  },
  {
    id: "AG-1004",
    title: "JWT Token Refresh Middleware",
    description: "Implement secure token storage and route guards.",
    status: "blocked",
    priority: "Critical",
    storyPoints: 8,
    dueDate: "2026-08-12",
    assignee: "Alex Chen",
    avatar: "AC",
    labels: ["jwt", "security"]
  },
  {
    id: "AG-1005",
    title: "Responsive Sidebar Navigation",
    description: "Fix drawer responsiveness for tablet screen sizes.",
    status: "review",
    priority: "Low",
    storyPoints: 2,
    dueDate: "2026-08-06",
    assignee: "John Taylor",
    avatar: "JT",
    labels: ["ui", "responsive"]
  },
  {
    id: "AG-1006",
    title: "Deploy Production Pipeline to Vercel",
    description: "Set up CI/CD GitHub action workflow.",
    status: "done",
    priority: "Medium",
    storyPoints: 3,
    dueDate: "2026-08-01",
    assignee: "Sarah Johnson",
    avatar: "SJ",
    labels: ["deployment", "backend"]
  }
];

const taskReducer = (state, action) => {
  switch (action.type) {
    case "READ":
      return action.payload && action.payload.length > 0 ? action.payload : state;
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((task) => (task.id === action.payload.id ? action.payload : task));
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

function Board() {
  const [tasks, dispatch] = useReducer(taskReducer, defaultTasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const data = await getTasks();
      if (data && data.length > 0) {
        dispatch({ type: "READ", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAction = async (action) => {
    try {
      switch (action.type) {
        case "CREATE": {
          dispatch({ type: "CREATE", payload: action.payload });
          await addTask(action.payload).catch(() => { });
          break;
        }
        case "UPDATE": {
          dispatch({ type: "UPDATE", payload: action.payload });
          await updateTask(action.payload.id, action.payload).catch(() => { });
          break;
        }
        case "DELETE": {
          dispatch({ type: "DELETE", payload: action.payload });
          await deleteTask(action.payload).catch(() => { });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    const existingTask = tasks.find((t) => t.id === taskId);
    if (existingTask) {
      const updated = { ...existingTask, status: newStatus };
      handleAction({ type: "UPDATE", payload: updated });
    }
  };

  const handleFormSubmit = (task) => {
    if (editingTask) {
      handleAction({ type: "UPDATE", payload: task });
    } else {
      const newTask = {
        ...task,
        id: task.id || `MOB-${Math.floor(3000 + Math.random() * 900)}`,
        avatar: task.avatar || "AC"
      };
      handleAction({ type: "CREATE", payload: newTask });
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handleAction({ type: "DELETE", payload: id });
    }
  };


  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase()) ||
      task.id?.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });



  return (
    <main className="board-page">
      {showForm && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="modal-content" style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "14px", maxHeight: "90vh", overflowY: "auto", position: "relative", minWidth: "420px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <button style={{ position: "absolute", top: "16px", right: "16px", background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "20px" }} onClick={() => { setShowForm(false); setEditingTask(null); }}>✕</button>
            <h2 style={{ color: "#0f172a", marginBottom: "18px", marginTop: "0", fontSize: "20px", fontWeight: "700" }}>{editingTask ? "Edit / Update Task" : "Add New Task"}</h2>
            <TaskForm
              initialData={editingTask}
              onSubmit={handleFormSubmit}
              buttonText={editingTask ? "Update Task" : "Add Task"}
            />
          </div>
        </div>
      )}

      <div className="board-container">
        {/* Filter Pills + Add Task Header */}
        <div className="board-header">
          <div className="board-filter">
            <button
              className={`filter-btn all ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn todo ${filter === "todo" ? "active" : ""}`}
              onClick={() => setFilter("todo")}
            >
              To Do
            </button>
            <button
              className={`filter-btn progress ${filter === "progress" ? "active" : ""
                }`}
              onClick={() => setFilter("progress")}
            >
              In Progress
            </button>
            <button
              className={`filter-btn blocked ${filter === "blocked" ? "active" : ""
                }`}
              onClick={() => setFilter("blocked")}
            >
              Blocked
            </button>
            <button
              className={`filter-btn review ${filter === "review" ? "active" : ""
                }`}
              onClick={() => setFilter("review")}
            >
              Review
            </button>
            <button
              className={`filter-btn done ${filter === "done" ? "active" : ""
                }`}
              onClick={() => setFilter("done")}
            >
              Done
            </button>
          </div>

          <button className="add-task-btn" onClick={() => setShowForm(true)}>
            + Add Task
          </button>
        </div>

        <div className="board-content">
          <Column
            title={
              filter === "all"
                ? "All Tasks"
                : filter === "todo"
                  ? "To Do"
                  : filter === "progress"
                    ? "In Progress"
                    : filter === "blocked"
                      ? "Blocked"
                      : filter === "review"
                        ? "Review"
                        : "Done"
            }
            tasks={
              filter === "all"
                ? filteredTasks
                : filteredTasks.filter((task) => task.status === filter)
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>

      </div>
    </main>
  );
}

export default Board;