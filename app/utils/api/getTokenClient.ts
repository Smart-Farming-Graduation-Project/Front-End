import Cookies from "js-cookie";
export const getTokenClient = () => {
  return Cookies.get("token");
};
export const deleteTokenClient = () => {
  localStorage.removeItem("token"); 
  console.log("Token deleted!");
};