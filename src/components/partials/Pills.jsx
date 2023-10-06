import React from "react";

const Pills = ({ bgColor = "bg-success", label = "label" }) => {
  return (
    <span
      className={` text-white text-center py-[5px] leading-none px-2 text-[10px] ${bgColor} rounded-2xl min-w-[60px] inline-block`}
    >
      {label}
    </span>
  );
};

export default Pills;
