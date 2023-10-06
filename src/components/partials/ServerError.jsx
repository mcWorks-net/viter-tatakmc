import React from "react";
import { VscBracketError } from "react-icons/vsc";
import IconServerError from "./svg/IconServerError";

const ServerError = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col p-2">
        <div className="mb-3">
          <IconServerError />
        </div>
        <span className="font-semibold text-gray-300 text-2xl">
          Server Error
        </span>
      </div>
    </>
  );
};

export default ServerError;
