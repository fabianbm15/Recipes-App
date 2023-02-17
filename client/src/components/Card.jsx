import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "./redux/actions";
import healthScoreImage from "../healthScore.png";
import favoritesOn from "../favorites_on.png";
import favoritesOff from "../favorites_off.png";

export default function Card(props) {
  const { id, title, diets, image, healthScore } = props;
  const textDiets = diets.join(", ");
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const myFavorites = useSelector((s) => s.myFavorites);

  function handleFavorite(recipe) {
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(recipe.id));
    } else {
      setIsFav(true);
      dispatch(addFavorite(recipe));
    }
  }

  useEffect(() => {
    myFavorites.forEach((recipe) => {
      if (recipe.id === props.id) {
        setIsFav(true);
      }
    });
  }, [myFavorites, props.id]);

  return (
    <div className="card">
      <div id="imageFavHs">
        <img className="imageRecipe" src={image} alt={image} />
        <div id="divFavHs">
          {isFav ? (
            <button
              className="favoritesButton"
              onClick={() => {
                handleFavorite(props);
              }}
            >
              <img src={favoritesOn} alt={favoritesOn} />
            </button>
          ) : (
            <button
              className="favoritesButton"
              onClick={() => handleFavorite(props)}
            >
              <img src={favoritesOff} alt={favoritesOff} />
            </button>
          )}
          <div className="healthScore">
            <img src={healthScoreImage} alt={healthScoreImage} />
            <p>{healthScore}</p>
          </div>
        </div>
      </div>
      <div id="cardNameDiets">
        <Link id="nameLink" to={`/detail/${id}`}>
          <p>{title}</p>
        </Link>
        <h5>Diets: {textDiets}</h5>
      </div>
    </div>
  );
}
