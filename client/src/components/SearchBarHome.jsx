import "./styles.css";
import downArrowImage from "../image/downArrow.png";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipes, getRecipes } from "./redux/actions";
import { Link } from "react-router-dom";

export default function SearchBarHome(props) {
  const dispatch = useDispatch();
  const { setSearchTerm } = props;
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const allRecipes = useSelector((store) => store.allRecipes);
  const [recipes, setRecipes] = useState([]);
  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * allRecipes.length)
  );

  useEffect(() => {
    dispatch(getRecipes());
    setRecipes(allRecipes);
  }, []);

  const handleSubmit = function (e) {
    e.preventDefault();
    setSearchTerm(true);
    dispatch(searchRecipes(searchTitle));
  };

  useEffect(() => {
    handleRandomRecipe();
  }, []);

  const handleRandomRecipe = function () {
    if (recipes.length > 0) {
      setRandomNum(Math.floor(Math.random() * recipes.length));
      setImage(recipes[randomNum].image);
      setTitle(recipes[randomNum].title);
    }
  };

  useEffect(() => {
    if (recipes.length > 0) {
      setImage(recipes[randomNum].image);
      setTitle(recipes[randomNum].title);
    }
  }, [randomNum, recipes]);

  return (
    <div className="searchBarHome">
      <div id="nameForm">
        <div id="divTitle">
          {recipes && recipes.length > 0 && image ? (
            <Link
              id="titleSearchBarHome"
              to={`/detail/${recipes[randomNum].id}`}
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
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button>Buscar</button>
          </form>
        </div>
      </div>
      <div>
        {recipes && recipes.length > 0 && image ? (
          <Link to={recipes.length ? `/detail/${recipes[randomNum].id}` : "#"}>
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
