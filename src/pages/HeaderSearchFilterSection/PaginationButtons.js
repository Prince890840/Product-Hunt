import React from "react";

// react-router-dom
import { useParams } from "react-router-dom";

const PaginationButtons = () => {
  const { date, month, year } = useParams();
  const fullMonthName = new Date(2023, month - 1).toLocaleString("en-US", {
    month: "long",
  });
  const formattedDate = `${month === undefined ? "" : fullMonthName} ${
    date === undefined ? "" : date
  } ${month && date ? "," : ""} ${year}`;
  return (
    <div className="header-section">
      <h2>Posts for {formattedDate} | Product Hunt</h2>
      <div className="pagination-buttons">
        <button className="button">←</button>
        <button className="button button-spacing">Daily</button>
        <button className="button button-spacing">→</button>
      </div>
    </div>
  );
};

export default PaginationButtons;
