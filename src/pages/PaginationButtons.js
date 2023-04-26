import React from "react";
import "../styles/hunt/_paginationbuttons.scss";

const PaginationButtons = () => {
  return (
    <div className="header-section">
      <h2>Posts for April 23, 2023 | Product Hunt</h2>
      <div className="pagination-buttons">
        <button className="button">←</button>
        <button className="button button-spacing">Daily</button>
        <button className="button button-spacing">→</button>
      </div>
    </div>
  );
};

export default PaginationButtons;
