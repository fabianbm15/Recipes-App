import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Detail from "./components/Detail";
import Create from "./components/Create";
import Favorites from "./components/Favorites";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div>{location.pathname === "/" ? null : <NavBar />}</div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Body />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </div>
  );
}

export default App;
