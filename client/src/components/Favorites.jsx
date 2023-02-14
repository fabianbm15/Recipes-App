import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterCards, orderCardsAlpha, orderCardsHs } from "./redux/actions";
import Card from "./Card";
import Filters from "./Filters";

export default function Favorites() {
  const dispatch = useDispatch();
  const myFavorites = useSelector((s) => s.myFavorites);

  function handleClickFavorites(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "filter") {
      return dispatch(filterCards(value));
    }
    if (name === "orderAl") {
      dispatch(orderCardsAlpha(value));
    }
    if (name === "orderHS") {
      dispatch(orderCardsHs(value));
    }
  }

  return (
    <div className="favorites">
      <h1>Favorites ❤️</h1>
      <Filters handleClickFavorites={handleClickFavorites} />
      <div className="cards">
        {myFavorites.map((recipe) => (
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
    </div>
  );
}
