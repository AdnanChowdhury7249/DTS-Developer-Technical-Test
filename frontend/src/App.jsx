import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Error connecting to backend');
      });
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Full-Stack Hello World</h1>
      <p className="text-lg text-gray-700">
        {error ? error : message}
      </p>
    </div>
  );
}

export default App;
