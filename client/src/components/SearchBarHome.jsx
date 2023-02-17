import "./styles.css";
import homeImage from "../image/homeImage.png";
import downArrowImage from "../image/downArrow.png";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "./redux/actions";
import { Link } from "react-router-dom";

export default function SearchBarHome(props) {
  const dispatch = useDispatch();
  const { setSearchTerm, allRecipes } = props;
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * allRecipes.length)
  );

  const handleSubmit = function (e) {
    e.preventDefault();
    setSearchTerm(true);
    dispatch(searchRecipes(title));
  };

  useEffect(() => {
    handleRandomRecipe();
  }, []);

  const handleRandomRecipe = function () {
    if (allRecipes.length > 0) {
      setRandomNum(Math.floor(Math.random() * allRecipes.length));
      setImage(allRecipes[randomNum].image);
      setTitle(allRecipes[randomNum].title);
    }
  };

  useEffect(() => {
    if (allRecipes.length > 0) {
      setImage(allRecipes[randomNum].image);
      setTitle(allRecipes[randomNum].title);
    }
  }, [randomNum, allRecipes]);

  return (
    <div className="searchBarHome">
      <div id="nameForm">
        <div id="divTitle">
          {image ? (
            <Link
              id="titleSearchBarHome"
              to={`/detail/${allRecipes[randomNum].id}`}
            >
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
            <input
              type="search"
              name="search"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button>Buscar</button>
          </form>
        </div>
      </div>
      <div>
        {image ? (
          <Link to={`/detail/${allRecipes[randomNum].id}`}>
            <img id="homeImage" src={image} alt={image} />
          </Link>
        ) : (
          <h1>Loading...</h1>
        )}

        <button onClick={handleRandomRecipe}>Random Recipe</button>
      </div>

      <img id="downArrow" src={downArrowImage} alt={downArrowImage} />
    </div>
  );
}
