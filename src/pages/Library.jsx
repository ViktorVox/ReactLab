import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

export default function Library({ token }) {
  return (
    <div>
      <h2>Модуль библиотеки</h2>

      {/* Форма создания книги */}
      <BookForm token={token} />

      {/* Список книг */}
      <BookList token={token} />
    </div>
  );
}
