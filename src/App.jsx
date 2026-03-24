import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null,
  );
  const [isLogin, setIsLogin] = useState(true);

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register", { name, email, password })
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleLogout() {
    axios
      .post(
        "http://127.0.0.1:8000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
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
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <header>
        <h2>ReactLab</h2>
        <nav>
          <a href="#">Hub</a>
          <a href="#">Contacts</a>
          <button onClick={handleLogout}>
            {user === null ? "Login / Register" : "Log Out"}
          </button>
        </nav>
      </header>

      <main>
        <h1>Hello, {user === null ? "Guest" : user.name}</h1>

        
        
        { user === null ? (<>
        <form onSubmit={isLogin === false ? handleRegister : handleLogin}>
          {isLogin === false ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Write name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
            </>
          ) : (
            ""
          )}
          <input
            type="email"
            name="email"
            placeholder="Write email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Write Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Send</button>
        </form>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {!isLogin ? "Login" : "Register"}
        </button>
        </>) : ("")}
      </main>
    </div>
  );
}

export default App;
