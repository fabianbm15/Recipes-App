import "./styles.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import validate from "./validate";

export default function Create() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    image: "",
    dishTypes: [],
    diets: [],
    summary: "",
    healthScore: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    dishTypes: [],
    diets: [],
    summary: "",
    healthScore: "",
    instructions: "",
  });

  function handleInputChange(e) {
    if (e.target.name === "diets") {
      setRecipeData({
        ...recipeData,
        [e.target.name]: [...recipeData[e.target.name], e.target.value],
      });
    } else if (e.target.name === "dishTypes") {
      const value = e.target.value;
      setRecipeData({
        ...recipeData,
        [e.target.name]: value.split(","),
      });
      setErrors(
        validate({
          ...recipeData,
          [e.target.name]: value.split(","),
        })
      );
    } else {
      setRecipeData({
        ...recipeData,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...recipeData,
          [e.target.name]: e.target.value,
        })
      );
    }
  }

  const handleSubmit = async function (e) {
    e.preventDefault();
    await axios.post(`http://localhost:3001/recipes`, recipeData);
    window.alert("La receta se ha creado con éxito.");
  };

  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Title: </label>
          <input
            className={errors.title && "warning"}
            type="text"
            name="title"
            placeholder="Enter Title"
            onChange={(e) => handleInputChange(e)}
          />
          <p className="danger">{errors.title}</p>
        </div>
        <div>
          <label>Health Score: </label>
          <input
            className={errors.healthScore && "warning"}
            type="text"
            name="healthScore"
            placeholder="Enter Health Score"
            onChange={(e) => handleInputChange(e)}
          />
          <p className="danger">{errors.healthScore}</p>
        </div>
        <div>
          <label>Dish Types: </label>
          <input
            className={errors.dishTypes && "warning"}
            type="text"
            name="dishTypes"
            placeholder="Enter Dish Types"
            onChange={(e) => handleInputChange(e)}
          />
          <p className="danger">{errors.dishTypes}</p>
          <h6>
            * Puede agregar varios Dish Types separándolos por una coma (,).
          </h6>
        </div>
        <div>
          <label>Image Url: </label>
          <input
            className={errors.image && "warning"}
            type="text"
            name="image"
            placeholder="Enter Image Url"
            onChange={(e) => handleInputChange(e)}
          />
          <p className="danger">{errors.image}</p>
        </div>
        <div>
          <label>Summary: </label>
          <input
            className={errors.summary && "warning"}
            type="text"
            name="summary"
            placeholder="Enter Summary"
            onChange={(e) => handleInputChange(e)}
          />
          <p className="danger">{errors.summary}</p>
        </div>
        <div>
          <label>Instructions: </label>
          <input
            className={errors.instructions && "warning"}
            type="text"
            name="instructions"
            placeholder="Enter Instructions"
            onChange={(e) => handleInputChange(e)}
          />
          <p className="danger">{errors.instructions}</p>
        </div>
        <div className="diets">
          <div>
            <input
              type="checkbox"
              name="diets"
              value="vegetarian"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Vegetarian</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="gluten free"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Gluten Free</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="dairy free"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Dairy Free</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="lacto ovo vegetarian"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Lacto-ovo Vegetarian</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="vegan"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Vegan</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="paleolithic"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Paleolithic</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="primal"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Primal</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="whole 30"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Whole 30</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="pescatarian"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Pescatarian</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="ketogenic"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Ketogenic</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="diets"
              value="fodmap friendly"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Fodmap Friendly</label>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
/*
ternero
25
almuerzo, cena
https://img.freepik.com/fotos-premium/chuleton-plancha-pimienta-ajo_79782-2241.jpg?w=740
ternero fresco un poco grande
primero cortarlo, y despues comer
*/

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
