import Cookies from "js-cookie";
export const getTokenClient = () => {
  return Cookies.get("token");
};
