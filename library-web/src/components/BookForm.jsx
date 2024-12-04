import React, { useState } from "react";
import axios from "axios";
import "../style/Form.css"

const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post("http://localhost:3000/books", form);
      setBooks([...books, response.data]);
      setForm({ title: "", author: "", genre: "", publicationYear: 0 });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleAddBook}>
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
        <button>Add Book</button>
    </form>
  );
};

export default Books;
