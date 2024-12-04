import { useState, useEffect } from "react";
import axios from "../api/api";
import "../style/Form.css"

const LoanForm = () => {
  const [formData, setFormData] = useState({ userId: "", bookId: "", loanDate: "" });
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, booksRes] = await Promise.all([axios.get("/users"), axios.get("/books")]);
        setUsers(usersRes.data);
        setBooks(booksRes.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/loans", formData);
      setFormData({ userId: "", bookId: "", loanDate: "" });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <select name="userId" value={formData.userId} onChange={handleChange} required>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <select name="bookId" value={formData.bookId} onChange={handleChange} required>
        <option value="">Select Book</option>
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>
      <input type="date" name="loanDate" value={formData.loanDate} onChange={handleChange} placeholder="Loan Date" required />
      <button type="submit">Add Loan</button>
    </form>
  );
};

export default LoanForm;
