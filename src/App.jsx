import { useState } from "react";

// Импортируем модули
import AuthForm from "./components/AuthForm";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
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

      {/* Регистрация / Вход */}
      <main>
        <h3>Hello, {user === null ? "Guest" : user.name}</h3>

        {user === null ? (
          <AuthForm setToken={setToken} setUser={setUser} />
        ) : (
          ""
        )}
      </main>

      {/* Библиотека */}
      <main>
        <BookForm token={token} />
        <BookList token={token} />
      </main>
    </div>
  );
}

export default App;
