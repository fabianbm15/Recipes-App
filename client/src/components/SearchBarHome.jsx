import "./styles.css";
import downArrowImage from "../image/downArrow.webp";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipes, getRecipes } from "./redux/actions";
import { Link } from "react-router-dom";

export default function SearchBarHome(props) {
   const dispatch = useDispatch();
   const { searchTerm, setSearchTerm } = props;
   const [image, setImage] = useState("");
   const [title, setTitle] = useState("");
   const [searchTitle, setSearchTitle] = useState("");
   const allRecipes = useSelector((store) => store.allRecipes);
   const [recipes, setRecipes] = useState([]);
   const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * allRecipes.length));

   useEffect(() => {
      dispatch(getRecipes());
      setRecipes(allRecipes);
   }, []);

   useEffect(() => {
      console.log("hola");
      if (recipes.length > 0) {
         setImage(recipes[randomNum].image);
         setTitle(recipes[randomNum].title);
      }
   }, [randomNum, recipes]);

   const handleRandomRecipe = useCallback(() => {
      if (recipes.length > 0) {
         const newRandomNum = Math.floor(Math.random() * recipes.length);
         setImage(recipes[newRandomNum].image);
         setTitle(recipes[newRandomNum].title);
         setRandomNum(newRandomNum);
      }
   }, [recipes, setImage, setTitle]);

   useEffect(() => {
      handleRandomRecipe();
   }, [handleRandomRecipe]);

   const handleSubmit = function (e) {
      e.preventDefault();
      setSearchTerm(true);
      dispatch(searchRecipes(searchTitle));
   };

   return (
      <div>
         {searchTerm === true ? (
            <div className="searchBarHomeEmpty"></div>
         ) : (
            <div>
               <div className="searchBarHome">
                  <div id="nameForm">
                     <div id="divTitle">
                        {recipes && recipes.length > 0 && image ? (
                           <Link id="titleSearchBarHome" to={`/detail/${recipes[randomNum].id}`}>
                              <h1>{title}</h1>
                           </Link>
                        ) : (
                           <h1>Loading...</h1>
                        )}
                     </div>
                     <h4>or</h4>
                     <div>
                        <h4>Search recipes</h4>
                        <form onSubmit={handleSubmit}>
                           <input type="search" name="search" onChange={(e) => setSearchTitle(e.target.value)} />
                           <button>Buscar</button>
                        </form>
                     </div>
                  </div>
                  <div id="imageAndRandomButton">
                     {recipes && recipes.length > 0 && image ? (
                        <Link to={recipes.length ? `/detail/${recipes[randomNum].id}` : "#"}>
                           <img id="homeImage" src={image} alt={image} />
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
