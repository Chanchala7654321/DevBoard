import "./TaskForm.css";
import { useState } from "react";

function TaskForm({ initialData, onSubmit, buttonText }) {
  const [task, setTask] = useState(
    initialData || {
      title: "",
      description: "",
      status: "todo",
      priority: "Medium",
      assignee: "",
      storyPoints: 0,
      dueDate: "",
      labels: [],
    }
  );

  const labels = [
    "Bug",
    "Feature",
    "Frontend",
    "Backend",
    "Testing",
    "Security",
    "Documentation",
    "Design",
  ];

  function handleChange(e) {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function toggleLabel(label) {
    if (task.labels.includes(label)) {
      setTask({
        ...task,
        labels: task.labels.filter((item) => item !== label),
      });
    } else {
      setTask({
        ...task,
        labels: [...task.labels, label],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(task);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Title */}

      <div className="form-group full-width">
        <label>Title</label>

        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
        />
      </div>

      {/* Description */}

      <div className="form-group full-width">
        <label>Description</label>

        <textarea
          rows="5"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </div>

      {/* Status */}

      <div className="form-group">
        <label>Status</label>

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Priority */}

      <div className="form-group">
        <label>Priority</label>

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      {/* Assignee */}

      <div className="form-group">
        <label>Assignee</label>

        <input
          type="text"
          name="assignee"
          value={task.assignee}
          onChange={handleChange}
        />
      </div>

      {/* Story Points */}

      <div className="form-group">
        <label>Story Points</label>

        <input
          type="number"
          name="storyPoints"
          value={task.storyPoints}
          onChange={handleChange}
        />
      </div>

      {/* Due Date */}

      <div className="form-group full-width">
        <label>Due Date</label>

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
      </div>

      {/* Labels */}

      <div className="form-group full-width">
        <label>Labels</label>

        <div className="label-container">
          {labels.map((label) => (
            <button
              key={label}
              type="button"
              className={
                task.labels.includes(label)
                  ? "label active"
                  : "label"
              }
              onClick={() => toggleLabel(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}

      <div className="button-group">
        <button type="submit" className="save-btn">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;