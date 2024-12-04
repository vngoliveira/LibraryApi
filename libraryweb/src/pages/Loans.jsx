import LoanList from "../components/LoanList";
import "../style/Home.css"

const Loans = () => {
  return (
    <div>
      <h1 className="generic-h1">Manage Loans</h1>
      <LoanList />
    </div>
  );
};

export default Loans;
