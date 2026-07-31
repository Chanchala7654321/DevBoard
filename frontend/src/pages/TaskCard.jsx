import "./TaskCard.css";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      {/* Top Header Row with ID, Title, and UP SIDE Edit / Delete Buttons */}
      <div className="task-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>{task.title}</h4>
        
        {/* UP SIDE Edit & Delete Buttons */}
        <div className="task-actions" style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          <button 
            onClick={() => onEdit(task)} 
            title="Edit Task"
            style={{ 
              padding: "4px 8px", 
              fontSize: "11px", 
              fontWeight: "600", 
              background: "#ffffff", 
              border: "1px solid #e2e8f0", 
              color: "#334155", 
              borderRadius: "6px", 
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px" 
            }}
          >
            <RiEditLine /> Edit
          </button>

          <button 
            onClick={() => onDelete(task.id)} 
            title="Delete Task"
            style={{ 
              padding: "4px 8px", 
              fontSize: "11px", 
              fontWeight: "600", 
              background: "#ffffff", 
              border: "1px solid #e2e8f0", 
              color: "#dc2626", 
              borderRadius: "6px", 
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px" 
            }}
          >
            <RiDeleteBin6Line /> Del
          </button>
        </div>
      </div>

      <p>{task.description}</p>

      <div className="task-footer">
        <span className={`priority ${task.priority ? task.priority.toLowerCase() : "medium"}`}>
          {task.priority || "Medium"}
        </span>

        <div className="avatar">
          {task.avatar || (typeof task.assignee === "string" ? task.assignee.substring(0, 2).toUpperCase() : "AC")}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;