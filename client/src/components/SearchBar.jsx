import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "./redux/actions";

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const { setSearchTerm } = props;
  const [title, setTitle] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    setSearchTerm(true);
    dispatch(searchRecipes(title));
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
