import { useEffect, useState } from "react";
import "./Home.css";
import { getTodo } from "../../services/todoService";

const Home = () => {
  const [todos, setTodos] = useState([]);

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
        <button className="create-btn">
          <span className="plus-icon">+</span> Create Task
        </button>
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
                <strong>Date:</strong> {todo.date}
              </p>
              <p>
                <strong>Category:</strong> {todo.category}
              </p>
              <p>
                <strong>Status:</strong>{" "}
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
