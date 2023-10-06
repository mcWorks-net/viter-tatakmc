import React from "react";
import { FaFolderOpen } from "react-icons/fa";
import IconNoData from "./svg/IconNoData";

const NoData = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col p-2">
        <span className="text-7xl text-gray-400">
          <IconNoData />
        </span>
        <span className="font-semibold text-gray-300 text-2xl">No Data</span>
      </div>
    </>
  );
};

export default NoData;
