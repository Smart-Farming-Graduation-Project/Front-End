import { cookies } from "next/headers";

export const getTokenServer = () => {
  const cookiesStore = cookies();
  const tokenCookie = cookiesStore.get("token");
  console.log("tokenCookie", tokenCookie);
  return tokenCookie?.value || null;
};

