export const isAuthenticated = () => {
  const localStorageToken = localStorage.getItem("token");
  if (!!localStorageToken) {
    return true;
  }
  return false;
};
