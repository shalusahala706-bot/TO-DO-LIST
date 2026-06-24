import { useState } from "react";
import "../home/Home.css";
import { Field, Formik, Form } from "formik";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValues, setEditValues] = useState({});

  const addList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName,
        tasks: [],
      };
      setLists([...lists, newList]);
      setSelectedListId(newList.id);
      setNewListName("");
    }
  };

  const deleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
    if (selectedListId === listId) {
      setSelectedListId(lists.length > 0 ? lists[0].id : null);
    }
  };

  return (
    <div className="containerr">
      <div className="list-creation">
        <input
          type="text"
          className="list-input"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Create: e.g., Preparations"
          onKeyPress={(e) => e.key === "Enter" && addList()}
        />
        <button className="create-list-btn" onClick={addList}>
          Create List
        </button>
      </div>

      {lists.length === 0 ? (
        <p className="no-lists">No lists created yet. Create your first list!</p>
      ) : (
        <div className="lists-container">
          <div className="list-tabs">
            {lists.map((list) => (
              <div key={list.id} className="list-tab-wrapper">
                <button
                  className={`list-tab ${selectedListId === list.id ? "active" : ""}`}
                  onClick={() => setSelectedListId(list.id)}
                >
                  {list.name}
                </button>
                <button
                  className="delete-list-btn"
                  onClick={() => deleteList(list.id)}
                  title="Delete list"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {selectedListId && (
            <div className="selected-list">
              <Formik
                initialValues={{
                  task: "",
                  category: "",
                  dueDate: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  setLists((prevLists) =>
                    prevLists.map((list) =>
                      list.id === selectedListId
                        ? {
                            ...list,
                            tasks: [
                              ...list.tasks,
                              {
                                ...values,
                                completed: false,
                              },
                            ],
                          }
                        : list,
                    )
                  );
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
                  <button type="submit" className="add-btn">
                    Add Task
                  </button>
                </Form>
              </Formik>

              <div className="todolist">
                <h3>List: {lists.find((l) => l.id === selectedListId)?.name}</h3>
                {lists.find((l) => l.id === selectedListId)?.tasks.length === 0 ? (
                  <p>No tasks added</p>
                ) : (
                  <ol className="tasks-list">
                    {lists
                      .find((l) => l.id === selectedListId)
                      ?.tasks.map((todo, index) => (
                        <li key={index} className="todocard">
                          <input
                            type="checkbox"
                            className="round-checkbox"
                            checked={todo.completed}
                            onChange={() => {
                              setLists((prevLists) =>
                                prevLists.map((list) =>
                                  list.id === selectedListId
                                    ? {
                                        ...list,
                                        tasks: list.tasks.map((item, i) =>
                                          i === index
                                            ? { ...item, completed: !item.completed }
                                            : item,
                                        ),
                                      }
                                    : list,
                                )
                              );
                            }}
                          />
                          {editingIndex === index ? (
                            <div className="edit-mode">
                              <input
                                type="text"
                                value={editValues.task}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, task: e.target.value })
                                }
                                placeholder="Task"
                              />
                              <select
                                value={editValues.category}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, category: e.target.value })
                                }
                              >
                                <option value="">Select category</option>
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="study">Study</option>
                                <option value="other">Other</option>
                              </select>
                              <input
                                type="date"
                                value={editValues.dueDate}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, dueDate: e.target.value })
                                }
                              />
                              <button
                                className="save-btn"
                                onClick={() => {
                                  setLists((prevLists) =>
                                    prevLists.map((list) =>
                                      list.id === selectedListId
                                        ? {
                                            ...list,
                                            tasks: list.tasks.map((item, i) =>
                                              i === index ? editValues : item,
                                            ),
                                          }
                                        : list,
                                    )
                                  );
                                  setEditingIndex(null);
                                }}
                              >
                                Save
                              </button>
                              <button
                                className="cancel-btn"
                                onClick={() => setEditingIndex(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="task-content">
                                <h4>{todo.task}</h4>
                                <p>{todo.category}</p>
                                <p>{todo.dueDate}</p>
                              </div>
                              <button
                                className="edit-btn"
                                onClick={() => {
                                  setEditingIndex(index);
                                  setEditValues(todo);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => {
                                  setLists((prevLists) =>
                                    prevLists.map((list) =>
                                      list.id === selectedListId
                                        ? {
                                            ...list,
                                            tasks: list.tasks.filter((_, i) => i !== index),
                                          }
                                        : list,
                                    )
                                  );
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
