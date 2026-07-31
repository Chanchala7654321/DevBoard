import "./SprintCard.css";

const tasks = [
  {
    id: 1,
    title: "Fix date picker timezone offset bug",
    status: "progress",
    user: "DK",
    color: "#06b6d4",
  },
  {
    id: 2,
    title: "Add real-time notification system",
    status: "todo",
    user: "SJ",
    color: "#f59e0b",
  },
  {
    id: 3,
    title: "Optimize ticket list rendering performance",
    status: "progress",
    user: "AC",
    color: "#3b82f6",
  },
  {
    id: 4,
    title: "Write end-to-end tests for ticket CRUD",
    status: "todo",
    user: "JT",
    color: "#10b981",
  },
];

function SprintCard() {
  return (
    <div className="sprint-card">

      <div className="sprint-header">

        <h3>Active Sprint</h3>

        <span className="badge">
          Sprint 25
        </span>

      </div>

      <div className="progress-info">

        <span>Progress</span>

        <span>0%</span>

      </div>

      <div className="progress-bar">

        <div className="progress-fill"></div>

      </div>

      <div className="ticket-info">

        <span>0/12 tickets done</span>

        <span>Aug 4</span>

      </div>

      <div className="task-list">

        {tasks.map((task) => (

          <div
            className="task-item"
            key={task.id}
          >

            <span
              className={`status ${task.status}`}
            ></span>

            <p>{task.title}</p>

            <div
              className="avatar"
              style={{ background: task.color }}
            >
              {task.user}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SprintCard;