import { useEffect, useState } from "react";
import axios from "../api/api";
import "../style/List.css"

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [editBookId, setEditBookId] = useState(null);
    const [form, setForm] = useState({
      title: "",
      author: "",
      genre: "",
      publicationYear: "",
    });
  
    useEffect(() => {
      fetchBooks();
    }, []);
  
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const handleEditClick = (book) => {
      setEditBookId(book.id);
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationYear: book.publicationYear,
      });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSave = async () => {
      try {
        await axios.put(`/books/${editBookId}`, form);
        setBooks(
          books.map((book) =>
            book.id === editBookId ? { ...book, ...form } : book
          )
        );
        setEditBookId(null);
        setForm({ title: "", author: "", genre: "", publicationYear: "" });
      } catch (error) {
        console.error("Error updating book:", error.message);
      }
    };
  
    const handleCancel = () => {
      setEditBookId(null);
      setForm({ title: "", author: "", genre: "", publicationYear: "" });
    };
  
    const deleteBook = async (bookId) => {
      try {
        await axios.delete(`http://localhost:3000/books/${bookId}`);
        setBooks(books.filter((book) => book.id !== bookId)); 
      } catch (error) {
        console.error("Error deleting book:", error.message);
      }
    };
  
    return (
      <div className="list-div">
        {editBookId === null ? (
            <>
            <h2>Book List</h2>
            
          <ul className="list-ul">
            {books.map((book) => (
              <li className="list-li" key={book.id}>
                {book.title} by {book.author} ({book.publicationYear})
                <div className="buttonGroup">
                  <button className="listButton green-button" onClick={() => handleEditClick(book)}>Edit</button>
                  <button className="listButton red-button" onClick={() => deleteBook(book.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          </>
        ) : (
          <div className="edit-container">
            <h3>Edit Book</h3>
            <input
              type="text"
              name="title"
              value={form.title}
              placeholder="Title"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="author"
              value={form.author}
              placeholder="Author"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="genre"
              value={form.genre}
              placeholder="Genre"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="publicationYear"
              value={form.publicationYear}
              placeholder="Year"
              onChange={handleInputChange}
            />
            <div className="buttonGroup">
              <button className="listButton green-button" onClick={handleSave}>Save</button>
              <button className="listButton red-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  };  
  
  export default BookList;
