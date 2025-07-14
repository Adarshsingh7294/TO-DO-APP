// 

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './edit.css';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ title: "", isCompleted: false });

  // Fetch todo by ID and set form values
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/todos/${id}`);
        const { title, isCompleted } = res.data;
        setTodo({
          title: title || "",
          // Ensure boolean type
          isCompleted: isCompleted === true || isCompleted === "true",
        });
      } catch (err) {
        console.error("Error fetching todo:", err);
        alert("Failed to load todo data.");
      }
    };
    fetchTodo();
  }, [id]);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit the updated todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/todos/${id}`, {
        title: todo.title,
        isCompleted: todo.isCompleted,
      });
      navigate("/todo"); // Redirect to Home
    } catch (err) {
      console.error("Error updating todo:", err);
      alert("Failed to update todo.");
    }
  };

  return (
    <div className="edit-body my-4">
        <h1>Edit Todo</h1>
      <div className="edit-container ">
    
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Todo Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Enter Title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check mt-3">
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            className="form-check-input"
            checked={todo.isCompleted}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isCompleted">
            Is Completed?
          </label>
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Update Todo
        </button>
      </form>
      </div>
    </div>
  );
};

export default EditTodo;
