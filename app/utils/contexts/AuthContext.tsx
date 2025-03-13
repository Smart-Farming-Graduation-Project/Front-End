"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getTokenClient, deleteTokenClient } from "../api/getTokenClient";

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
  login: (token: string) => void;
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

  const logout = () => {
    deleteTokenClient();
    setUser(null);
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    updateUser(token);
  };

  useEffect(() => {
    updateUser();
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, logout, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
