import React from "react";
import { useState } from "react";

export default function SearchBar(props) {
  const [title, setTitle] = useState("");
  const { handleSearch } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(title);
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Buscar</button>
      </form>
    </div>
  );
}
