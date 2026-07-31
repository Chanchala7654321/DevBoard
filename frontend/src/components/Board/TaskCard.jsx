import "./TaskCard.css";

function TaskCard({ task }) {
  return (
    <div className="task-card">

      <div className="card-top">

        <span className="ticket-id">
          {task.ticket}
        </span>

        <div className="avatar">
          {task.assignee.initial}
        </div>

      </div>

      <h3 className="task-title">
        {task.title}
      </h3>

      <div className="task-tags">

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <span className="task-type">
          <span className="dot"></span>
          {task.type}
        </span>

      </div>

      <div className="card-footer">

        <span>{task.storyPoints} SP</span>

        <span>{task.dueDate}</span>

      </div>

      <div className="card-actions">

        <button>→ In Progress</button>

        <button>→ Review</button>

        <button>→ Done</button>

      </div>

    </div>
  );
}

export default TaskCard;