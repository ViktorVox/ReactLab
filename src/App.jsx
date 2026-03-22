import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks").then((response) => {
      setTasks(response.data.data);
    });
  }, []);

  const toggleTask = (task) => {
    // Инвертируем текущий статус: если было false, станет true, и наоборот
    const updatedStatus = !task.is_completed;

    // Отправляем PUT-запрос (обновление)
    axios
      .put(`http://127.0.0.1:8000/api/tasks/${task.id}`, {
        is_completed: updatedStatus,
      })
      .then(() => {
        // Если сервер ответил успехом, обновляем интерфейс:
        setTasks(
          tasks.map((t) => {
            // Ищем нашу задачу по ID и меняем ей статус локально
            if (t.id === task.id) {
              return { ...t, is_completed: updatedStatus };
            }
            // Остальные задачи возвращаем без изменений
            return t;
          }),
        );
      })
      .catch((error) => {
        console.error("Ошибка при обновлении:", error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Ошибка при удалении:", error);
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

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={!!task.is_completed} // !! превращает null в false, чтобы React не ругался
              onChange={() => toggleTask(task)}
            />
            <span
              style={{
                textDecoration: task.is_completed ? "line-through" : "none",
              }}
            >
              {task.id}. {task.title} - {task.description}
            </span>

            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
