"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { getTokenClient, deleteTokenClient } from "../api/getTokenClient";
import { useSession, signOut } from "next-auth/react";
import { refreshToken } from "../api/Auth";

interface TokenType {
  sub: string;
  id: string;
  given_name: string;
  email: string;
  Role: string;
  iss: string;
  jti: number;
  exp: number;
}

interface AuthContextType {
  user: TokenType | null;
  isLoading: boolean;
  logout: () => void;
  login: (accessToken: string, refreshTokenValue: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
  login: () => {},
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TokenType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const updateUser = (token?: string) => {
    const currentToken = token || getTokenClient();

    if (!currentToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<TokenType>(currentToken);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        setUser(null);
        return;
      }

      setUser(decoded);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTokenHandler = async () => {
    try {
      const accessToken = Cookies.get("token");
      const refreshTokenValue = Cookies.get("refreshToken");

      if (!accessToken || !refreshTokenValue) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await refreshToken(accessToken, refreshTokenValue);

      if (response.statusCode === 200) {
        Cookies.set("token", response.data.tokens.accessToken);
        Cookies.set("refreshToken", response.data.tokens.refreshToken);
        updateUser(response.data.tokens.accessToken);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  const logout = () => {
    deleteTokenClient();
    signOut({ callbackUrl: "/signin" });
    setUser(null);
  };

  const login = (accessToken: string, refreshTokenValue: string) => {
    Cookies.set("token", accessToken);
    Cookies.set("refreshToken", refreshTokenValue);
    updateUser(accessToken);
  };

  // Check if token is close to expiry (e.g., less than 5 minutes)
  const isTokenExpiringSoon = (token: string): boolean => {
    try {
      const decoded = jwtDecode<TokenType>(token);
      const currentTime = Date.now() / 1000;
      
      // Refresh if token expires in less than 5 minutes
      return decoded.exp - currentTime < 300;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!user) return;
    
    const token = Cookies.get("token");
    if (!token) return;
    
    const checkInterval = setInterval(() => {
      if (isTokenExpiringSoon(token)) {
        refreshTokenHandler();
      }
    }, 60000);
    
    return () => clearInterval(checkInterval);
  }, [user]);

  useEffect(() => {
    if (session?.backendToken) {
      login(session.backendToken, session.refreshToken || "");
    } else {
      updateUser();
    }
  }, [session]);

  return <AuthContext.Provider value={{ user, isLoading, logout, login }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
