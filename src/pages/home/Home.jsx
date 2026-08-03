import { useEffect, useState } from "react";
import "./Home.css";
import { getTodo, createTodo, updateTodo } from "../../services/todoService";
import TechBtn from "../component/Button";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    completed: false,
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
      const newTodo = {
        title: formData.title,
        date: formData.date,
        category: formData.category,
        completed: formData.completed,
      };

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

  return (
    <div className="home-container">
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
            <div key={todo.id || todo._id} className="card">
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
                  onChange={async (e) => {
                    try {
                      const updated = {
                        ...todo,
                        completed: e.target.checked,
                      };
                      await updateTodo(todo._id || todo.id, updated);

                      setTodos(
                        todos.map((t) =>
                          t._id === todo._id || t.id === todo.id ? updated : t,
                        ),
                      );
                    } catch (error) {
                      console.error("Error updating todo:", error);
                    }
                  }}
                />{" "}
                {todo.completed ? " Completed" : "Pending"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
