import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Books from "./pages/Books";
import Loans from "./pages/Loans";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
