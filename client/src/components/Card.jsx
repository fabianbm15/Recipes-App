import React from "react";
import imagenPrueba from "../prueba.jpg";
import { Link } from "react-router-dom";

export default function Card() {
  return (
    <div className="card">
      <img src={imagenPrueba} alt="prueba.jpg" />

      <button>❤️</button>

      <Link to={"/Detail"}>
        <p className="botonTitle">Fried Anchovies with Sage</p>
      </Link>

      <p>Dairy Free</p>
    </div>
  );
}
