import { useEffect, useState } from "react";
import axios from "../api/api";
import "../style/Reports.css";

const Reports = () => {
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [pendingLoans, setPendingLoans] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchMostBorrowedBooks();
    fetchPendingLoans();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchMostBorrowedBooks = async () => {
    try {
      const response = await axios.get("/reports/most-loaned-books");
      setMostBorrowedBooks(response.data);
    } catch (error) {
      console.error("Error fetching most borrowed books:", error.message);
    }
  };

  const fetchPendingLoans = async () => {
    try {
      const response = await axios.get("/reports/pending-loans");
      setPendingLoans(response.data);
    } catch (error) {
      console.error("Error fetching pending loans:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };
  
  const getBookTitleById = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.title : "Unknown Book";
  };

  return (
    <div className="reports-container">
      <div className="report-section">
        <h3>Most Loaned Books</h3>
        {mostBorrowedBooks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Times Loaned</th>
              </tr>
            </thead>
            <tbody>
              {mostBorrowedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{getBookTitleById(book.bookId)}</td>
                  <td>{book.loanCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for most loaned books.</p>
        )}
      </div>

      <div className="report-section">
        <h3>Pending Loans</h3>
        {pendingLoans.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>User Name</th>
                <th>Loan Date</th>
              </tr>
            </thead>
            <tbody>
              {pendingLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{getBookTitleById(loan.bookId)}</td>
                  <td>{loan.User.name}</td>
                  <td>{formatDate(loan.loanDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending loans.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
