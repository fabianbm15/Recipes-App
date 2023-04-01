import "./styles.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BACK = process.env.REACT_APP_BACK;

export default function Detail() {
   const { detailId } = useParams();
   const [recipe, setRecipe] = useState({});

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`${BACK}/recipes/${detailId}`);
            const data = response.data.data;
            setRecipe(data);
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, [detailId]);

   return (
      <div className="container">
         <div className="detail">
            <div className="divDetailImage">
               <div id="detailsA">
                  <h1>Title: {recipe.title}</h1>
                  <h3>Dish Type: {recipe.dishTypes ? recipe.dishTypes.join(", ") : ""}</h3>
                  <h3>Diet: {recipe.diets ? recipe.diets.join(", ") : ""}</h3>
                  <h3>Health Score: {recipe.healthScore}</h3>
               </div>
               <div>
                  <img src={recipe.image} alt={recipe.image} />
               </div>
            </div>
            <div id="summaryInstructions">
               <p>Summary: {recipe.summary}</p>
               <p>Instructions: {recipe.instructions}</p>
            </div>
         </div>
      </div>
   );
}
