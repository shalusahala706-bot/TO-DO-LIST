import { useState } from "react";
import "../home/Home.css";
import { Field, Formik, Form } from "formik";

const Home = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div className="containerr">
      <Formik
        initialValues={{
          task: "",
          category: "",
          dueDate: "",
        }}
        onSubmit={(values, { resetForm }) => {
          setTodos((prev) => [
            ...prev,
            {
              ...values,
              completed: false,
            },
          ]);
          resetForm();
        }}
      >
        <Form className="todo-form">
          <Field
            className="inpt"
            id="task"
            name="task"
            placeholder="Enter your Task here"
          />
          <Field as="select" className="inpt" name="category">
            <option value="">Select category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </Field>

          <Field className="inpt" name="dueDate" type="date" />
          <button type="submit" className="add-btn">Add Task</button>
        </Form>
      </Formik>
      <div className="todolist">
        <h3>Todos</h3>
        {todos.length === 0 ? (
          <p>No task added</p>
        ) : (
          todos.map((todo, index) => (
            <div key={index} className="todocard">
              <input
                type="checkbox"
                className="round-checkbox"
                checked={todo.completed}
                onChange={() => {
                  setTodos((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, completed: !item.completed }
                        : item,
                    )
                  );
                }}
              />
              <h4>{todo.task}</h4>
              <p>{todo.category}</p>
              <p>{todo.dueDate}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Home;
