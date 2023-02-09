import "./styles.css";
import React from "react";

export default function Filters() {
  return (
    <div className="filter">
      <div>
        <h4>Filter</h4>
        <select name="filter" defaultValue={"Default"}>
          <option value="Default">Default</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="glutenFree">Gluten Free</option>
          <option value="dairyFree">Dairy Free</option>
          <option value="veryHealthy">Very Healthy</option>
          <option value="cheap">Cheap</option>
          <option value="veryPopular">Very Popular</option>
          <option value="sustainable">Sustainable</option>
          <option value="lowFodmap">Low Fodmap</option>
        </select>
      </div>
      <div>
        <h4>Alphabetic Order</h4>
        <select name="orderAl" defaultValue={"Default"}>
          <option value="Default">Default</option>
          <option value="aZ">A - Z</option>
          <option value="Za">Z - A</option>
        </select>
      </div>
      <div>
        <h4>Health Score Order</h4>
        <select name="orderHS" defaultValue={"Default"}>
          <option value="Default">Default</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
    </div>
  );
}
