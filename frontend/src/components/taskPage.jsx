import React from 'react';
import { useEffect, useState } from 'react';
import { getAllTasks, createTask, deleteTask } from '../api/api';
import CreateTaskForm from './taskForm';
import TaskModal from './taskModal';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);



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

        <TaskModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
          <CreateTaskForm onSubmit={handleAddTask} />
        </TaskModal>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded shadow border"
            >
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">
                Status: {task.status ? '✅ Complete' : '⌛ Incomplete'}
              </p>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700 font-semibold text-sm"
              >
                🗑️ Delete
              </button>
            </div>

          ))}
        </div>

      </div>
    </div>

  );
}
export default TaskPage;
