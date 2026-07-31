import TaskCard from "./TaskCard";
import "./Column.css";

function Column({ title, count, tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="column">
      <div className="column-header">
        <h3>
          {title} <span className="count">{count}</span>
        </h3>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
