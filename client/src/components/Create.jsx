import "./styles.css";
import React from "react";

export default function Create() {
  return (
    <div className="form">
      <form>
        <div>
          <label>Name: </label>
          <input />
        </div>
        <div>
          <label>Resume: </label>
          <input />
        </div>
        <div>
          <label>Health score: </label>
          <input />
        </div>
        <div>
          <label>Step by step: </label>
          <input />
        </div>
        <div>
          <div>
            <input type="checkbox" />
            <label>Vegetarian</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Vegan</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Gluten Free</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Dairy Free</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Very Healthy</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Cheap</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Very Popular</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Sustainable</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Low Fodmap</label>
          </div>
        </div>
        <button>Create</button>
      </form>
    </div>
  );
}
/*
Ruta de creación de recetas: debe contener

[ ] Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Resumen del plato
Nivel de "comida saludable" (health score)
Paso a paso
[ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
[ ] Botón/Opción para crear una nueva receta
*/
