import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { getRecipes } from "./components/redux/actions";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SearchBarHome from "./components/SearchBarHome";
import Filters from "./components/Filters";
import Body from "./components/Body";
import Detail from "./components/Detail";
import Create from "./components/Create";
import Favorites from "./components/Favorites";
import Information from "./components/Information";
import CreatedRecipes from "./components/CreatedRecipes";

function App() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();

   const [currentPage, setCurrentPage] = useState(1);
   const [maxPage, setMaxPage] = useState(0);
   const itemsPerPage = 9;
   const [recipes, setRecipes] = useState([]);
   const [searchTerm, setSearchTerm] = useState(false);
   const [favoritesPage, setFavoritesPage] = useState(false);
   const [createdPage, setCreatedPage] = useState(false);
   const [access, setAccess] = useState(false);
   const allRecipes = useSelector((store) => store.allRecipes);

   // Iniciar o cerrar sesión
   function logout() {
      setAccess(false);
      navigate("/");
   }

   useEffect(() => {
      !access && navigate("/");
   }, [access, navigate]);

   // Calcular las recetas del home.
   useEffect(() => {
      dispatch(getRecipes());
   }, []);

   // Calcular los ítems por página, en este caso 9.
   const selectItemsPerPage = (recipes) => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return recipes.slice(start, end);
   };

   // Asignar los datos de las recetas a Recipes para mosrar en pantalla.
   useEffect(() => {
      setRecipes(selectItemsPerPage(allRecipes));
      setMaxPage(Math.ceil(allRecipes.length / 9));
   }, [allRecipes, currentPage, searchTerm]);

   return (
      <div className="App">
         <div className="container">
            {location.pathname === "/" ? null : (
               <NavBar
                  logout={logout}
                  setSearchTerm={setSearchTerm}
                  setFavoritesPage={setFavoritesPage}
                  setCreatedPage={setCreatedPage}
                  setCurrentPage={setCurrentPage}
               />
            )}
            {location.pathname === "/home" ? <SearchBarHome searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null}

            {location.pathname === "/home" ? <Filters searchTerm={searchTerm} favoritesPage={favoritesPage} createdPage={createdPage} /> : null}
         </div>
         <Routes>
            <Route path="/" element={<Login setAccess={setAccess} />}></Route>
            <Route
               path="/home"
               element={<Body recipes={recipes} currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage} />}
            ></Route>
            <Route path="/detail/:detailId" element={<Detail />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route
               path="/favorites"
               element={
                  <Favorites
                     setFavoritesPage={setFavoritesPage}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                     selectItemsPerPage={selectItemsPerPage}
                  />
               }
            ></Route>
            <Route
               path="/createdrecipes"
               element={
                  <CreatedRecipes
                     setCreatedPage={setCreatedPage}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                     selectItemsPerPage={selectItemsPerPage}
                  />
               }
            ></Route>
         </Routes>
         {location.pathname === "/" ? null : <Information />}
      </div>
   );
}

export default App;
