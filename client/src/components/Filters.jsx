import "./styles.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortRecipes } from "./redux/actions";

export default function Filters(props) {
   const [selectedFilter, setSelectedFilter] = useState("Default");
   const [selectedOrderAlpha, setSelectedOrderAlpha] = useState("Default");
   const [selectedOrderHs, setSelectedOrderHs] = useState("Default");
   const { searchTerm, favoritesPage, createdPage } = props;
   const dispatch = useDispatch();

   function handleClick(e) {
      e.preventDefault();
      const { name, value } = e.target;

      if (name === "filter") {
         setSelectedFilter(value);
      }
      if (name === "orderAl") {
         setSelectedOrderAlpha(value);
      }
      if (name === "orderHs") {
         setSelectedOrderHs(value);
      }
   }

   useEffect(() => {
      dispatch(sortRecipes(selectedFilter, selectedOrderAlpha, selectedOrderHs, searchTerm, favoritesPage, createdPage));
   }, [selectedFilter, selectedOrderAlpha, selectedOrderHs, searchTerm, favoritesPage, createdPage, dispatch]);

   return (
      <div className="filter">
         <div>
            <h4>Filter Diets</h4>
            <select name="filter" defaultValue={"Default"} onChange={handleClick}>
               <option value="Default">Default</option>
               <option value="vegetarian">Vegetarian</option>
               <option value="gluten free">Gluten Free</option>
               <option value="dairy free">Dairy Free</option>
               <option value="lacto ovo vegetarian">Lacto-ovo Vegetarian</option>
               <option value="vegan">Vegan</option>
               <option value="paleolithic">Paleolithic</option>
               <option value="primal">Primal</option>
               <option value="whole 30">Whole 30</option>
               <option value="pescatarian">Pescatarian</option>
               <option value="ketogenic">Ketogenic</option>
               <option value="fodmap friendly">Fodmap Friendly</option>
            </select>
         </div>
         <div>
            <h4>Alphabetic Order</h4>
            <select name="orderAl" defaultValue={"Default"} onChange={handleClick}>
               <option value="Default">Default</option>
               <option value="A-Z">A - Z</option>
               <option value="Z-A">Z - A</option>
            </select>
         </div>
         <div>
            <h4>Health Score Order</h4>
            <select name="orderHs" defaultValue={"Defaul"} onChange={handleClick}>
               <option value="Default">Default</option>
               <option value="Ascendente">Ascendente</option>
               <option value="Descendente">Descendente</option>
            </select>
         </div>
      </div>
   );
}

/*
const dietsApiExt = [
      "vegetarian",
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan",
      "paleolithic",
      "primal",
      "whole 30",
      "pescatarian",
      "ketogenic",
      "fodmap friendly",
    ];
    */
