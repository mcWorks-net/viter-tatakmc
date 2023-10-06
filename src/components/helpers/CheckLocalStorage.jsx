export const checkLocalStorage = () => {
  let restoToken = null;
  try {
    restoToken = JSON.parse(localStorage.getItem("restoToken"));
  } catch (error) {
    restoToken = null;
  }

  return restoToken;
};
