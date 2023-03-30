import "./styles.css";
import React from "react";
import Card from "./Card";

export default function Cards(props) {
   const { recipes } = props;

   return (
      <div className="cards">
         {recipes.map((recipe) => (
            <Card key={recipe.id} id={recipe.id} title={recipe.title} diets={recipe.diets} healthScore={recipe.healthScore} image={recipe.image} />
         ))}
      </div>
   );
}
