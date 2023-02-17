import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

export default function Favorites(props) {
  const { setFavoritesPage } = props;
  const myFavorites = useSelector((s) => s.myFavorites);

  useEffect(() => {
    setFavoritesPage(true);
  }, []);

  return (
    <div className="favorites">
      <h1>Favorites ⭐</h1>
      {myFavorites.length === 0 ? (
        <div id="emptyFavorites">Favorite Recipes are empty.</div>
      ) : (
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
      )}
    </div>
  );
}
