export const isAuthenticated = () => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};
