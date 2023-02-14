import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar(props) {
  const { handleHomeClick } = props;
  return (
    <div className="navBar">
      <Link to={"/home"}>
        <button onClick={handleHomeClick}>Home</button>
      </Link>
      <Link to={"/favorites"}>
        <button>My Favorites</button>
      </Link>
      <Link to={"/create"}>
        <button>Create Recipe</button>
      </Link>
      <SearchBar handleSearch={props.handleSearch} />
      <Link to={"/"}>
        <button id="logOutButton" onClick={props.logout}>
          Log Out
        </button>
      </Link>
    </div>
  );
}
