import { useEffect, useState } from "react";
import axios from "../api/api";
import "../style/List.css";

const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [editLoanId, setEditLoanId] = useState(null);
    const [editData, setEditData] = useState({
        userId: "",
        bookId: "",
    });

    const fetchLoans = async () => {
        try {
            const response = await axios.get("/loans");
            setLoans(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const handleEdit = (loan) => {
        setEditLoanId(loan.id);
        setEditData(loan);
    };

    const handleSave = async () => {
        try {
            await axios.put(`/loans/return/${editLoanId}`,
                {
                    userId: editData.userId,
                    bookId: editData.bookId,
                }
            );

            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan.id === editLoanId ? { ...loan, ...editData } : loan
                )
            );
            setEditLoanId(null);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCancel = () => {
        setEditLoanId(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditData({
            ...editData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "long", year: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
    };

    return (
        <div className="list-div">
            {editLoanId === null ? (
                <>
                    <h2>Loan List</h2>
                    <ul className="list-ul">
                        {loans.map((loan) => (
                            <li className="list-li" key={loan.id}>
                                User {loan.User.name} borrowed {loan.Book.title} on{" "}
                                {formatDate(loan.loanDate)} - Returned: {loan.returned ? "Yes" : "No"}
                                <div className="buttonGroup">
                                    <button
                                        className="green-button listButton"
                                        onClick={() => handleEdit(loan)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="edit-container">
                    <h3>Edit Loan</h3>
                    <div>
                        <input
                            type="text"
                            name="userId"
                            value={editData.User.name}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="bookId"
                            value={editData.Book.title}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="loanDate"
                            value={formatDate(editData.loanDate)}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div>
                        <label>
                            Returned:
                        </label>
                        <input
                            className="custom-checkbox"
                            type="checkbox"
                            name="returned"
                            checked={editData.returned}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="button-div">
                        <button className="green-button listButton" onClick={handleSave}>
                            Save
                        </button>
                        <button className="red-button listButton" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoanList;
