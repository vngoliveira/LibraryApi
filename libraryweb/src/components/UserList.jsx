import { useEffect, useState } from "react";
import axios from "../api/api";
import "../style/List.css"

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [form, setForm] = useState({
      name: "",
      email: "",
    });
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const handleEditClick = (user) => {
      setEditUserId(user.id);
      setForm({ name: user.name, email: user.email });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSave = async () => {
      try {
        await axios.put(`/users/${editUserId}`, form);
        setUsers(
          users.map((user) =>
            user.id === editUserId ? { ...user, ...form } : user
          )
        );
        setEditUserId(null);
        setForm({ name: "", email: "" });
      } catch (error) {
        console.error("Error updating user:", error.message);
      }
    };
  
    const handleCancel = () => {
      setEditUserId(null);
      setForm({ name: "", email: "" });
    };
  
    const deleteUser = async (userId) => {
      try {
        await axios.delete(`/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId)); 
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    };
  
    return (
      <div className="list-div">
        {editUserId === null ? (
        <>
        <h2>User List</h2>
          <ul className="list-ul">
            {users.map((user) => (
              <li className="list-li" key={user.id}>
                {user.name} - {user.email}
                <div className="buttonGroup">
                  <button className="listButton green-button" onClick={() => handleEditClick(user)}>Edit</button>
                  <button className="listButton red-button" onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          </>
        ) : (
          <div className="edit-container">
            <h3>Edit User</h3>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
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

  
  export default UserList;
