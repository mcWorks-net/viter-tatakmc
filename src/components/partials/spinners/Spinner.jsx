import React from "react";

const Spinner = ({ diameter = "w-[40px]", color }) => {
  return (
    <div className="spinner">
      <svg viewBox="25 25 50 50" className={`${diameter}`}>
        <circle r="20" cy="50" cx="50" className={color}></circle>
      </svg>
    </div>
  );
};

export default Spinner;
