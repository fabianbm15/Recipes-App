import "./styles.css";
import downArrowImage from "../image/downArrow.webp";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipes, getRecipes } from "./redux/actions";
import { Link } from "react-router-dom";

export default function SearchBarHome(props) {
   const dispatch = useDispatch();
   const { searchTerm, setSearchTerm } = props;
   const allRecipes = useSelector((store) => store.allRecipes);
   const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * allRecipes.length));
   const [recipe, setRecipe] = useState({});

   useEffect(() => {
      dispatch(getRecipes());
   }, [dispatch]);

   useEffect(() => {
      if (allRecipes.length > 0 && !recipe.image) {
         setRecipe(allRecipes[randomNum]);
      }
   }, [allRecipes, randomNum, recipe.image]);

   const handleRandomRecipe = useCallback(() => {
      if (allRecipes.length > 0) {
         const newRandomNum = Math.floor(Math.random() * allRecipes.length);
         setRandomNum(newRandomNum);
      }
   }, [allRecipes, setRandomNum]);

   useEffect(() => {
      handleRandomRecipe();
   }, [handleRandomRecipe]);

   const handleSubmit = (e) => {
      e.preventDefault();
      setSearchTerm(true);
      dispatch(searchRecipes(e.target.search.value));
   };

   return (
      <div>
         {searchTerm ? (
            <div className="searchBarHomeEmpty"></div>
         ) : (
            <div>
               <div className="searchBarHome">
                  <div id="nameForm">
                     <div id="divTitle">
                        {recipe.id ? (
                           <Link id="titleSearchBarHome" to={`/detail/${recipe.id}`}>
                              <h1>{recipe.title}</h1>
                           </Link>
                        ) : (
                           <h1>Loading...</h1>
                        )}
                     </div>
                     <h4>or</h4>
                     <div>
                        <h4>Search recipes</h4>
                        <form onSubmit={handleSubmit}>
                           <input type="search" name="search" />
                           <button>Buscar</button>
                        </form>
                     </div>
                  </div>
                  <div id="imageAndRandomButton">
                     {recipe.id ? (
                        <Link to={`/detail/${recipe.id}`}>
                           <img id="homeImage" src={recipe.image} alt={recipe.title} />
                        </Link>
                     ) : (
                        <h1>Loading...</h1>
                     )}
                     <button onClick={handleRandomRecipe}>Random Recipe</button>
                  </div>
               </div>
               <img id="downArrow" src={downArrowImage} alt={downArrowImage} />
            </div>
         )}
      </div>
   );
}
