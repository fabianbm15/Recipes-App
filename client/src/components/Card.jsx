import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite, deleteCreatedRecipe } from "./redux/actions";
import healthScoreImage from "../image/healthScore.webp";
import favoritesOn from "../image/favorites_on.webp";
import favoritesOff from "../image/favorites_off.webp";
import closeImage from "../image/cerrar.webp";

export default function Card(props) {
   const { id, title, diets, image, healthScore } = props;
   const textDiets = diets.length === 0 ? "none" : diets.join(", ");
   const [isFav, setIsFav] = useState(false);
   const dispatch = useDispatch();
   const location = useLocation();
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

   const handleClickClose = function (id) {
      dispatch(deleteCreatedRecipe(id));
   };

   return (
      <div className="card">
         <div id="imageFavHs">
            <Link to={`/detail/${id}`}>
               <img className="imageRecipe" src={image} alt={image} />
            </Link>
            {location.pathname === "/createdrecipes" ? (
               <button id="closeButton" onClick={() => handleClickClose(id)}>
                  <img id="closeImage" src={closeImage} alt={closeImage} />
               </button>
            ) : null}
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
                  <button className="favoritesButton" onClick={() => handleFavorite(props)}>
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
