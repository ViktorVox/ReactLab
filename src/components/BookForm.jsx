import { useState, useEffect } from "react";
import axios from "axios";

export default function BookForm({ token }) {
  const [author, setAuthor] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [publisherYear, setPublisherYear] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/authors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAuthor(response.data.data);
        localStorage.setItem("author", JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  function createBook(e) {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/books",
        {
          title: bookTitle,
          publisher_year: publisherYear,
          author_id: selectedAuthor,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        // Очищаем форму после успеха
        setBookTitle("");
        setPublisherYear("");
        setSelectedAuthor("");
        alert("Книга успешно создана!");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          console.error("Ошибки валидации:", error.response.data.errors);
          alert("Ошибка! Проверь консоль.");
        } else {
          console.error(error);
        }
      });
  }

  return (
    <div>
      <h3>Create Book</h3>
      <form onSubmit={createBook}>
        <input
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Publisher Year (e.g. 2023)"
          value={publisherYear}
          onChange={(e) => setPublisherYear(e.target.value)}
        />

        <select
          name="authors"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          <option value="" disabled>
            Select Author...
          </option>

          {author.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
