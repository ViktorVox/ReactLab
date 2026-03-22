import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks").then((response) => {
      setTasks(response.data.data);
    });
  }, []);

  const addTask = (e) => {
    // Блокируем перезагрузку страницы
    e.preventDefault();

    // Отправляем POST-запрос
    axios
      .post("http://127.0.0.1:8000/api/tasks", {
        title: newTask, // Отправляем на бэкенд наш текст из стейта
      })
      .then((response) => {
        // Очищаем инпут (чтобы можно было вводить новую задачу)
        setNewTask("");

        // Обновляем список задач на экране, добавляя новую задачу в конец массива
        setTasks([...tasks, response.data.data]);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении:", error);
      });
  };

  return (
    <div>
      <h1>Мои задачи на Laravel</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button>Добавить</button>
      </form>

      {tasks.map((task) => (
        <ul>
          <li key={task.id}>
            {task.id}. {task.title} - {task.description}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default App;
