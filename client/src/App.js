import "./App.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Filters from "./components/Filters";
import Body from "./components/Body";
import Detail from "./components/Detail";
import Create from "./components/Create";
import Favorites from "./components/Favorites";
import { useSelector, useDispatch } from "react-redux";
import { filterCards } from "./components/redux/actions";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Default");
  const [selectedOrderAlpha, setSelectedOrderAlpha] = useState("Default");
  const [selectedOrderHs, setSelectedOrderHs] = useState("Default");
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 9;
  const myFavorites = useSelector((s) => s.myFavorites);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/allrecipes`);
      var data = response.data.data;
      if (selectedFilter !== "Default") {
        data = data.filter((e) => {
          return e.diets.includes(selectedFilter);
        });
      }
      if (selectedOrderAlpha === "A-Z") {
        data.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedOrderAlpha === "Z-A") {
        data.sort((a, b) => b.title.localeCompare(a.title));
      }
      if (selectedOrderHs === "Ascendente") {
        data.sort((a, b) => a.healthScore - b.healthScore);
      } else if (selectedOrderHs === "Descendente") {
        data.sort((a, b) => b.healthScore - a.healthScore);
      }
      const recipesData = selectItemsPerPage(data);
      setRecipes(recipesData);
    } catch (error) {
      console.error(error);
    }
  };

  const selectItemsPerPage = (recipes) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return recipes.slice(start, end);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedFilter, selectedOrderAlpha, selectedOrderHs]);

  const handleHomeClick = () => {
    fetchData();
  };

  const handleSearch = async (title) => {
    if (!title) {
      window.alert("Ingrese el nombre de la receta que desea buscar.");
    } else {
      const response = await axios.get(
        `http://localhost:3001/recipes?title=${title}`
      );
      setRecipes(response.data.data);
    }
  };

  function handleClick(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "filter") {
      setSelectedFilter(value);
    }
    if (name === "orderAl") {
      setSelectedOrderAlpha(value);
    }
    if (name === "orderHS") {
      setSelectedOrderHs(value);
    }
  }

  function logout() {
    setAccess(false);
    navigate("/");
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  return (
    <div className="App">
      <div>
        {location.pathname === "/" ? null : (
          <NavBar
            handleSearch={handleSearch}
            handleHomeClick={handleHomeClick}
            logout={logout}
          />
        )}
        {location.pathname.split("/")[1] ===
        "" ? null : location.pathname.split("/")[1] ===
          "create" ? null : location.pathname.split("/")[1] ===
          "detail" ? null : location.pathname.split("/")[1] ===
          "favorites" ? null : (
          <Filters handleClick={handleClick} />
        )}
      </div>
      <Routes>
        <Route path="/" element={<Login setAccess={setAccess} />}></Route>
        <Route
          path="/home"
          element={
            <Body
              recipes={recipes}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        ></Route>
        <Route path="/detail/:detailId" element={<Detail />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </div>
  );
}

export default App;
