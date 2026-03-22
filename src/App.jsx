import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks").then((response) => {
      setTasks(response.data.data);
    });
  }, []);

  return (
    <div>
      <h1>Мои задачи на Laravel</h1>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
