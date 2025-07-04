import { cookies } from "next/headers";

export const getTokenServer = () => {
  try {
    // This will work only in server components during request processing
    const cookiesStore = cookies();
    const tokenCookie = cookiesStore.get("token");
    return tokenCookie?.value || null;
  } catch (error) {
    // When called outside a request context, return null
    console.warn("Token retrieval attempted outside request context");
    return null;
  }
};
