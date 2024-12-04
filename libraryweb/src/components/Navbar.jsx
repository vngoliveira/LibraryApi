import { Link } from "react-router-dom";
import "../style/NavBar.css"

const Navbar = () => {
  return (
    <nav>
      <h1>Library Management</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/loans">Loans</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
