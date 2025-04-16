# DTS-Developer-Technical-Test

# Task Manager App
A  task management tool that allows users create, view, update, delete, and search for tasks.

Built using:
⚛️ React (Frontend)
🎨 Tailwind CSS
🧠 Node.js & Express (Backend)
🗃️ PostgreSQL (Database)

# Features
- Create, edit, delete tasks

- Toggle task status (Complete/Incomplete)

- Search tasks by title

- Responsive design (desktop & mobile)

- Modal forms for task creation/editing

- RESTful API with input validation and error handling

# Getting Started
1) Create a PostgreSQL database.
2) Create a .env file in the backend root folder:
   
![image](https://github.com/user-attachments/assets/6921b642-a9a3-4659-84f5-5c0a83d06c57)

3) cd db
4)  in the db folder uncomment out populateDb.js and run node populateDb.js
5)  go back to root and run npm install to install all dependencies.
6)  run nodemon app.js to start the backend server.
7)  to run the frontend cd frontend
8)  run npm run dev to start the front end
9)  in your browser search bar type http://localhost:5173/ to view the app.
10)  re comment out populateDB.js after seeding the database to prevent duplicate inserts. 
