import TaskPage from './components/taskPage';
import './style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskPage />} />
      </Routes>
    </Router>
  )
}

export default App;
