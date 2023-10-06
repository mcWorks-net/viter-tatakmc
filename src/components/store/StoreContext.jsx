import React from "react";
import { StoreReducer } from "./StoreReducer";

const initVal = {
  error: false,
  info: false,
  success: false,
  validate: false,
  isSave: false,
  isShow: false,
  isConfirm: false,
  isRestore: false,
  isAdd: false,
  isSearch: false,
  isDelete: false,

  startIndex: 0,

  isLogin: false,
  isLogout: false,

  credentials: {},
};

const StoreContext = React.createContext();

const StoreProvider = (props) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initVal);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
