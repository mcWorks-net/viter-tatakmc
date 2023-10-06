import { setSuccess } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";

import React from "react";
import { FaCheck } from "react-icons/fa";

const Toast = () => {
  const { dispatch, store } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setSuccess(false));
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 2000);
  });
  return (
    <div className=" !bg-white border shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-l-0 border-l-[4px] border-l-green-800 rounded-br-md rounded-tr-md px-2 py-1 fixed top-5 z-50 left-1/2 -translate-x-1/2 animate-fadeIn">
      <p className="flex items-center gap-2 mb-0 leading-none py-1">
        <FaCheck className="fill-green-800 h-4 w-4" /> {store.message}
      </p>
    </div>
  );
};

export default Toast;
