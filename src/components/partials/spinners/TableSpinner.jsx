import React from "react";
import Spinner from "./Spinner";

const TableSpinner = () => {
  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0 z-[1] flex justify-center items-center flex-col text-center bg-white/80">
        <Spinner diameter="w-[30px]" color="stroke-accent" />
        <span className="mt-1 text-dark">Loading...</span>
      </div>
    </>
  );
};

export default TableSpinner;
