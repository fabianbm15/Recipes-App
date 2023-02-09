import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div className="navBar">
      <Link to={"/home"}>
        <button className="boton">Home</button>
      </Link>
      <Link to={"/favorites"}>
        <button className="boton">My Favorites</button>
      </Link>
      <Link to={"/create"}>
        <button className="boton">Create Recipe</button>
      </Link>

      <input type="search" name="search" />
      <button>Buscar</button>

      <Link to={"/"}>
        <button className="botonLogOut" onClick={props.logout}>
          Log Out
        </button>
      </Link>
    </div>
  );
}
