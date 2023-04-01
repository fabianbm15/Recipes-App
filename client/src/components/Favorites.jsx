import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Filters from "./Filters";
import Pages from "./Pages";

export default function Favorites(props) {
   const { setFavoritesPage, currentPage, setCurrentPage, selectItemsPerPage, searchTerm, favoritesPage, createdPage } = props;
   const [recipes, setRecipes] = useState([]);
   const [maxPage, setMaxPage] = useState(0);
   const myFavorites = useSelector((s) => s.myFavorites);

   useEffect(() => {
      setFavoritesPage(true);
   }, [setFavoritesPage]);

   useEffect(() => {
      setRecipes(selectItemsPerPage(myFavorites));
      setMaxPage(Math.ceil(myFavorites.length / 9));
   }, [currentPage, myFavorites, selectItemsPerPage]);

   return (
      <div className="container">
         <div className="favorites">
            <h1>Favorites ⭐</h1>
            <Filters searchTerm={searchTerm} favoritesPage={favoritesPage} createdPage={createdPage} />
            {recipes.length === 0 ? (
               <div id="emptyFavorites">Favorite Recipes are empty.</div>
            ) : (
               <div>
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
               </div>
            )}
            <Pages currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage} />
         </div>
      </div>
   );
}
