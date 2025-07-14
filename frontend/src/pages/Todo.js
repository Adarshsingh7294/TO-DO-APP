// 

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({
    title: "",
    isCompleted: false,
  });
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  // Fetch todos
  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/todos");
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err.message);
      }
    };
    fetchAllTodos();
  }, [render]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoToSend = {
        title: input.title.trim(),
        isCompleted: !!input.isCompleted,
      };
      await axios.post("http://to-do-app-mgkl.vercel.app/api/v1/todos", todoToSend);
      setInput({ title: "", isCompleted: false });
      setRender((prev) => !prev);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add todo.");
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/todos/${id}`);
        setRender((prev) => !prev);
      } catch (err) {
        alert("Failed to delete todo");
      }
    }
  };

  // Toggle status
  const toggleStatus = async (id, currentStatus) => {
    console.log("ID:", id); // ✅ fixed ESLint warning
    try {
      await axios.put(`http://localhost:8080/api/v1/todos/${id}`, {
        isCompleted: !currentStatus,
      });
      setRender((prev) => !prev);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // or clear any other auth data
    navigate("/login");
  };

  return (
    <div className="todo-container">
      {/* Logout button */}
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <h1 className="todo-title">My Todos</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <label htmlFor="title" className="todo-label">
          Todo Title
        </label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={handleChange}
          id="title"
          placeholder="Enter Title"
          required
          className="todo-input"
        />

        <div className="checkbox-container">
          <input
            name="isCompleted"
            type="checkbox"
            checked={input.isCompleted}
            onChange={handleChange}
            id="isCompleted"
            className="todo-checkbox"
          />
          <label htmlFor="isCompleted" className="checkbox-label">
            Is Completed?
          </label>
        </div>

        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>

      <table className="todo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>
                  <span
                    className={`status-badge ${
                      item.isCompleted ? "completed" : "pending"
                    }`}
                  >
                    {item.isCompleted ? "Completed" : "Pending"}
                  </span>
                </td>
                <td>
                  <Link to={`/edit/${item._id}`}>
                    <button
                      className="edit-button"
                      onClick={() => toggleStatus(item._id, item.isCompleted)}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-todos">
                No Todos Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
