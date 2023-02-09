import React from "react";
import Cards from "./Cards";
import Filters from "./Filters";
import Pages from "./Pages";

export default function Body() {
  return (
    <div className="body">
      <Filters />
      <Cards />
      <Pages />
    </div>
  );
}
