import React from "react";

export default function Pages({ currentPage, setCurrentPage, maxPage }) {
  function prev() {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  function next() {
    if (currentPage === maxPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="pages">
      <button onClick={prev}>Prev</button>
      <button id="buttonCurrentPage">
        {currentPage} de {maxPage}
      </button>
      <button onClick={next}>Next</button>
    </div>
  );
}
