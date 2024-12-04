import BookList from "../components/BookList";
import "../style/Home.css"

const Books = () => {
  return (
    <div>
      <h1 className="generic-h1">Manage Books</h1>
      <BookList />
    </div>
  );
};

export default Books;
