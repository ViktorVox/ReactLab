import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// Импортируем страницы
import Library from "./pages/Library";

// Импортируем компоненты
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null,
  );

  return (
    <div>
      {/* Шапка сайта */}
      <header>
        <Navbar user={user} setToken={setToken} setUser={setUser} />
      </header>

      {user === null ? (
        <main>
          <AuthForm setToken={setToken} setUser={setUser} />
        </main>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <h2>Модули</h2>
                <div>
                  <section>
                    <Link to="/books">
                      <img src="#" alt="Books" />
                    </Link>
                    <h3>Книги</h3>
                    <p>Блок с реализацией CRUD книг.</p>
                  </section>
                  <section>
                    <Link to="/authors">
                      <img src="#" alt="Authors" />
                    </Link>
                    <h3>Авторы</h3>
                    <p>Блок с реализацией CRUD авторов.</p>
                  </section>
                  <section>
                    <Link to="/tasks">
                      <img src="#" alt="Tasks" />
                    </Link>
                    <h3>Задачи</h3>
                    <p>Блок с реализацией CRUD задач.</p>
                  </section>
                  <section>
                    <Link to="/parser">
                      <img src="#" alt="Parser" />
                    </Link>
                    <h3>Парсер</h3>
                    <p>Блок с реализацией парсера.</p>
                  </section>
                  <section>
                    <Link to="/crm">
                      <img src="#" alt="CRM" />
                    </Link>
                    <h3>Задачи</h3>
                    <p>
                      Блок с реализацией CRM с разделением на админ и
                      пользовтельскую часть.
                    </p>
                  </section>
                </div>
              </main>
            }
          />

          {/* Модуль библиотеки */}
          <Route path="/books" element={<Library token={token} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
