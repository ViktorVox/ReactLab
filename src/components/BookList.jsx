import axios from "axios";
import { useEffect, useState } from "react";

export default function BookList({ token }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <>
      <ul>
        <div className="">{console.log(books)}</div>
        {books.map((item) => (
          <li key={item.id}>{item.title} - {item.publisher_year}. {item.author_id}</li>
        ))}
      </ul>
    </>
  );
}
