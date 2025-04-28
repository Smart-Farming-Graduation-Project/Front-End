import Cookies from "js-cookie";
export const getTokenClient = () => {
  return Cookies.get("token");
};
export const deleteTokenClient = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  // console.log("Token deleted!");
};