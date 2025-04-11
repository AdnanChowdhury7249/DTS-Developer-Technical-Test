import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getAllTasks = () => API.get("/tasks")
export const createTask = (taskData) => API.post("/tasks", taskData)
export const searchTasksByTitle = (title) => API.get(`/tasks/search/title?title=${encodeURIComponent(title)}`)
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const updateStatus = (id, status) => API.put(`/tasks/${id}`, { status });

