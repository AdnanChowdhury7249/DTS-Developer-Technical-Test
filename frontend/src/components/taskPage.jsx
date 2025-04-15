import React from 'react';
import { useEffect, useState } from 'react';
import { getAllTasks, createTask, deleteTask, updateStatus, editTask, searchTasksByTitle } from '../api/api';
import CreateTaskForm from './taskForm';
import TaskModal from './taskModal';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [searchTitle, setSearchTitle] = useState("");

  const handleSearch = async () => {
    try {
      const res = await searchTasksByTitle(searchTitle);
      setTasks(res.data);
    } catch (err) {
      console.error("Search failed", err);
      setError("No tasks found");
    }
  };


  useEffect(() => {
    getAllTasks()
      .then(res => setTasks(res.data))
      .catch((error) => {
        console.error("error fetching tasks", error)
        setError("Failed to fetch items.");
      })
  }, [])

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
      const res = await getAllTasks();
      setTasks(res.data);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))

    } catch (error) {
      console.error("failed to delete task", error)

    }

  }

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateStatus(id, !currentStatus);

      setTasks((prev) => prev.map((task) => task.id == id ? { ...task, status: !currentStatus } : task))

    } catch (error) {
      console.error("error updating the status", error)

    }
  }

  const handleUpdateTask = async (updatedData) => {
    try {
      await editTask(taskToEdit.id, updatedData);
      const res = await getAllTasks();
      setTasks(res.data);
      setShowEditModal(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="w-full max-w-3xl px-4  mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Task Page</h1>
        <p className="text-center mb-6 text-gray-600">
          Welcome to the Task Page. Start managing your tasks here.
        </p>

        <div className="flex  mb-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gray-300  px-4 py-2 rounded hover:bg-gray-200 transition cursor-pointer"
          >
            ➕ Add Task
          </button>
        </div>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border px-3 py-2 rounded w-full bg-white"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Search
          </button>
          <button
            onClick={async () => {
              const res = await getAllTasks();
              setTasks(res.data);
              setSearchTitle("");
            }}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
            Reset
          </button>
        </div>

        <TaskModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
          <CreateTaskForm onSubmit={handleAddTask} />
        </TaskModal>
        <TaskModal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
          <CreateTaskForm
            initialData={taskToEdit}
            onSubmit={handleUpdateTask}
            buttonLabel="Update Task"
          />
        </TaskModal>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="relative p-4 bg-white rounded shadow border"
            >
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-700">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleToggleStatus(task.id, task.status)}
                className="text-blue-500 hover:underline text-sm cursor-pointer"
              >
                {task.status ? 'Complete' : 'Incomplete'}
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="absolute top-2 right-2 w-8 h-8  bg-gray-100 hover:bg-red-200 hover:text-red-700 flex items-center justify-center transition cursor-pointer"
                aria-label="Delete task"
              >
                ✕
              </button>
              <button
                onClick={() => {
                  setTaskToEdit(task);
                  setShowEditModal(true);
                }}
                className="absolute top-2 right-12 w-8 h-8  bg-gray-100 hover:bg-red-200 hover:text-red-700 flex items-center justify-center transition cursor-pointer"
              >
                ✏️
              </button>
            </div>

          ))}
        </div>

      </div>
    </div>

  );
}
export default TaskPage;
