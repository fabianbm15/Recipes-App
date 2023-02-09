import "./styles.css";
import React from "react";
import imagenPrueba from "../prueba.jpg";

export default function Detail() {
  return (
    <div>
      <div className="divDetailImage">
        <div>
          <h1>Nombre</h1>
          <h1>Tipo de plato</h1>
          <h1>Tipo de dieta</h1>
          <h1>Health Score</h1>
        </div>
        <div>
          <img src={imagenPrueba} alt="prueba.jpg" />
        </div>
      </div>
      <div>
        <h1>Resumen</h1>
        <h1>Paso a Paso</h1>
      </div>
    </div>
  );
}
