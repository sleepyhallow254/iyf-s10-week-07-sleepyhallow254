import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter(task => !task.completed));
  }

  function getFilteredTasks() {
    if (filter === "active") return tasks.filter(t => !t.completed);
    if (filter === "completed") return tasks.filter(t => t.completed);
    return tasks;
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className="container">

      <div className="header">
        <h1>Todo List</h1>
        <p className="subtitle">Stay organized and productive</p>
      </div>

      {/* INPUT */}
      <div className="input-section">

        <input
          className="task-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Enter a task..."
        />

        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>

      </div>

      {/* FILTERS */}
      <div className="filter-section">

        <button
          className="filter-btn"
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className="filter-btn"
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className="filter-btn"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>

      {/* TASK LIST */}
      <ul className="task-list">

        {filteredTasks.map(task => (

          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >

            <div
              className="checkbox"
              onClick={() => toggleTask(task.id)}
            ></div>

            <span
              className="task-text"
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              ✕
            </button>

          </li>

        ))}

      </ul>

      {/* ACTIONS */}
      <div className="actions">

        <button className="btn btn-secondary" onClick={clearCompleted}>
          Clear Completed
        </button>

      </div>

    </div>
  );
}

export default App;