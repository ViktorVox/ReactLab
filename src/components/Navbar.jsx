import axios from "axios";

// Ловим пропсы (рации) от App.jsx
export default function Navbar({ user, setToken, setUser }) {
  function handleLogout() {
    const currentToken = localStorage.getItem("token");

    axios
      .post(
        "http://127.0.0.1:8000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${currentToken}` } },
      )
      .then(() => {
        localStorage.clear();
        setToken("");
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <h2>ReactLab</h2>
      <nav>
        <a href="#">Hub</a>
        <a href="#">Contacts</a>

        {/* Если пользователь есть, показываем кнопку Log Out, если нет - ничего */}
        {user !== null ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <span>Please Login</span>
        )}
      </nav>
    </>
  );
}
