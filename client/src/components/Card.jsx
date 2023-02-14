import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "./redux/actions";

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
      <img src={image} alt={image} />
      {isFav ? (
        <button
          onClick={() => {
            handleFavorite(props);
          }}
        >
          ❤️
        </button>
      ) : (
        <button onClick={() => handleFavorite(props)}>🤍</button>
      )}
      <div className="healthScore">
        <h1>⭐</h1>
        <p>{healthScore}</p>
      </div>

      <Link id="nameLink" to={`/detail/${id}`}>
        <h3>{title}</h3>
      </Link>
      <h5>Diets: {textDiets}</h5>
    </div>
  );
}
