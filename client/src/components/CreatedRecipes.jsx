import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreatedRecipe } from "./redux/actions";
import Card from "./Card";
import Pages from "./Pages";

export default function CreatedRecipes(props) {
  const { setCreatedPage, selectItemsPerPage, currentPage, setCurrentPage } =
    props;
  const [recipes, setRecipes] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const dispatch = useDispatch();
  const createdRecipes = useSelector((s) => s.createdRecipes);
  // Calcular las recetas creadas.
  useEffect(() => {
    dispatch(getCreatedRecipe());
    setCreatedPage(true);
  }, []);

  // Asignar los datos de las recetas a Recipes para mosrar en pantalla.
  useEffect(() => {
    setRecipes(selectItemsPerPage(createdRecipes));
    setMaxPage(Math.ceil(createdRecipes.length / 9));
  }, [createdRecipes, currentPage]);

  return (
    <div className="createdRecipes">
      <h1>Created Recipes</h1>
      {recipes.length === 0 ? (
        <div id="emptyFavorites">Created Recipes are empty.</div>
      ) : (
        <div className="cards">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
              image={recipe.image}
            />
          ))}
        </div>
      )}
      <Pages
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}
      />
    </div>
  );
}
