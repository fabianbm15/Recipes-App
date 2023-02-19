import "./styles.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar(props) {
  const location = useLocation();

  const handleClick = function () {
    props.setSearchTerm(false);
    props.setFavoritesPage(false);
    props.setCreatedPage(false);
    props.setCurrentPage(1);
  };

  return (
    <div className="navBar">
      <Link to={"/home"}>
        <button id="home" onClick={handleClick}>
          <h1>FoodCook</h1>
        </button>
      </Link>
      <Link to={"/favorites"}>
        <button>My Favorites</button>
      </Link>
      <Link to={"/create"}>
        <button onClick={handleClick}>Create Recipe</button>
      </Link>
      <Link to={"/createdrecipes"}>
        <button onClick={handleClick}>Created Recipes</button>
      </Link>
      {location.pathname === "/home" ? null : (
        <SearchBar setSearchTerm={props.setSearchTerm} />
      )}
      <Link to={"/"}>
        <button id="logOutButton" onClick={props.logout}>
          Log Out
        </button>
      </Link>
    </div>
  );
}
