import React from "react";
import Cards from "./Cards";
import Pages from "./Pages";

export default function Body(props) {
  return (
    <div className="body">
      <Cards recipes={props.recipes} />
      <Pages
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
        maxPage={props.maxPage}
      />
    </div>
  );
}
