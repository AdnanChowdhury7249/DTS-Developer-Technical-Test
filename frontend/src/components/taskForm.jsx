import React from "react";
import { useState, useEffect } from "react";
import { createTask } from "../api/api";
import { useParams } from "react-router-dom";

const CreateTaskForm = ({ onSubmit, initialData = {}, buttonLabel = "Create Task" }) => {
  const [taskData, setTaskData] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    dueDate: initialData?.dueDate ?? "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData?.title) {
      setTaskData({
        title: initialData.title,
        description: initialData.description,
        dueDate: initialData.due_date
          ? new Date(initialData.due_date).toISOString().split("T")[0]
          : "",
      });
    }
  }, [initialData?.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(taskData);
      setTaskData({ title: "", description: "", dueDate: "" });
    } catch (error) {
      console.error("error creating task", error);
      setError("Failed to create task.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {initialData?.title ? "Edit Task" : "Create a Task"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}
      <label className="block text-sm font-medium text-gray-700 mt-2.5" >Title:</label>
      <input type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        required>
      </input>

      <label className="block text-sm font-medium text-gray-700 mt-2.5" >Description:</label>
      <textarea rows={4}
        name="description"
        value={taskData.description}
        onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-400 "
      />

      <label className="block text-sm font-medium text-gray-700 mt-2.5">Due Date:</label>
      <input type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
        className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        required>
      </input>
      <button type="submit" className="py-2 px-4 mt-4 border-1 rounded-sm cursor-pointer hover:bg-gray-100">
        {buttonLabel}
      </button>
    </form>

  )
}

export default CreateTaskForm
