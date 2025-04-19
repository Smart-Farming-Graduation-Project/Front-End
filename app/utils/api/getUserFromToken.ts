// import { jwtDecode } from "jwt-decode";
// import { getTokenClient } from "./getTokenClient";
// interface TokenType {
//   id: string;
//   name: string;
//   role: string;
//   iat: number;
//   exp: number;
// }

// const getUserFromToken = (): TokenType | null => {
//   const token = getTokenClient();
//   if (!token) return null;
//   try {
//     return jwtDecode<TokenType>(token);
//   } catch (error) {
//     console.error("Invalid token", error);
//     return null;
//   }
// };
// export default getUserFromToken;
