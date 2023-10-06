import React from "react";
import { setIsLogin } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { checkLocalStorage } from "../helpers/CheckLocalStorage";
import { checkRoleToRedirect } from "../helpers/login-functions";
import { queryData } from "../helpers/queryData";

const useOtherLogin = (navigate) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loginLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const fetchLogin = async () => {
      const login = await queryData(`/v1/user-other/token`, "post", {
        token: checkLocalStorage().token,
      });

      if (typeof login === "undefined" || !login.success) {
        localStorage.removeItem("restoToken");
        setLoading(false);
      } else {
        setLoading(false);
        checkRoleToRedirect(navigate, login.data);
      }
    };
    if (
      checkLocalStorage() !== null &&
      checkLocalStorage().token !== undefined
    ) {
      fetchLogin();
      dispatch(setIsLogin(false));
    } else {
      setLoading(false);
      dispatch(setIsLogin(true));
    }
  }, []);

  return { loginLoading };
};

export default useOtherLogin;
