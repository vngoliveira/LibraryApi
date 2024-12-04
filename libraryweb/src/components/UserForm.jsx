import { useState } from "react";
import axios from "../api/api";
import "../style/Form.css"

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", formData);
      setFormData({ name: "", email: "", address: "", phone: "" });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
 