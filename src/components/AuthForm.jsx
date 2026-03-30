import { useState } from "react";
import axios from "axios";

// Компонент принимает "пропсы" от App.jsx
export default function AuthForm({ setToken, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", { name, email, password })
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
      })
      .catch((error) => console.error(error));
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", { email, password })
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
      })
      .catch((error) => console.error(error));
  }

  // Возвращаем только верстку формы
  return (
    <>
      <form onSubmit={isLogin === false ? handleRegister : handleLogin}>
        {isLogin === false && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Write name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Write email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Write Password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <a onClick={() => setIsLogin(!isLogin)}>
        {!isLogin ? "Join in account" : "Create new account"}
      </a>
    </>
  );
}
