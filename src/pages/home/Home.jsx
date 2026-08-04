import { useEffect, useState } from "react";
import "./Home.css";
import { getTodo, createTodo, updateTodo } from "../../services/todoService";
import TechBtn from "../component/Button";

const palette = [
  "#F28B82", "#FBBC04", "#FFF475", "#CCFF90",
  "#A7FFEB", "#CBF0F8", "#D7AEFB", "#E6C9A8", "#FFFFFF"
];

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    completed: false,
    color: "#FFFFFF",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = { ...formData };
      await createTodo(newTodo);
      const { data } = await getTodo();
      setTodos(data);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
    setFormData({
      title: "",
      date: "",
      category: "",
      completed: false,
      color: "#FFFFFF",
    });
    setShowForm(false);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await getTodo();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleStatusChange = async (todo, checked) => {
    const updated = { ...todo, completed: checked };
    try {
      await updateTodo(todo._id, updated);
      setTodos(todos.map((t) => (t._id === todo._id ? updated : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleColorChange = async (todo, newColor) => {
    const updated = { ...todo, color: newColor };
    try {
      await updateTodo(todo._id, updated);
      setTodos(todos.map((t) => (t._id === todo._id ? updated : t)));
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  return (
    <div className="home-container animated-bg">
      <div className="home-header">
        <h1 className="heading">TodoTask</h1>
        <div className="btn-size">
          <TechBtn
            text="Create Task"
            color="green"
            onClick={() => setShowForm(true)}
          />
        </div>
        {showForm && (
          <div className="popup">
            <div className="popup-content">
              <h2>Create Todo</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                />
                <div className="form-actions">
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="cards-container">
        {todos.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id || todo.id}
              className="card"
              style={{ backgroundColor: todo.color || "#FFF" }}
            >
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {todo.date
                  ? new Date(todo.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not set"}
              </p>
              <p>
                <strong>Category:</strong> {todo.category}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => handleStatusChange(todo, e.target.checked)}
                />{" "}
                {todo.completed ? " Completed" : "Pending"}
              </p>

              {/* 🎨 Color Palette */}
              <div className="palette">
                {palette.map((c, i) => (
                  <span
                    key={i}
                    className={`color-dot ${todo.color === c ? "selected" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => handleColorChange(todo, c)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
