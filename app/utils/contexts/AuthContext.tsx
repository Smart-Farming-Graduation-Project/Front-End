"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getTokenClient, deleteTokenClient } from "../api/getTokenClient";

interface TokenType {
  sub: string; // User ID
  given_name?: string; // First name (optional)
  family_name?: string; // Last name (optional)
  email?: string; // Email (optional)
  Role?: string; // User role
  iss: string; // Token issuer
  jti: string; // JWT ID
  exp: number; // Expiration time
  nbf: number; // Not valid before time
  iat: number; // Issued at time
  // Add any other claims your backend includes
}

interface AuthContextType {
  user: TokenType | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
  login: () => {},
  token: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TokenType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUser = (newToken?: string) => {
    const currentToken = newToken || getTokenClient();

    if (!currentToken) {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<TokenType>(currentToken);

      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.log("Token expired, logging out");
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        deleteTokenClient(); // Clear the expired token
      } else {
        setUser(decoded);
        setToken(currentToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      deleteTokenClient(); // Clear the invalid token
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    deleteTokenClient();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const login = (newToken: string) => {
    if (!newToken) {
      console.error("Attempted to login with empty token");
      return;
    }

    // Store token in localStorage
    localStorage.setItem("token", newToken);

    // Update user state
    updateUser(newToken);
  };

  // Auto-refresh the token state on focus or storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      updateUser();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateUser();
      }
    };

    // Check token on mount
    updateUser();

    // Set up event listeners
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Set up periodic token validation (optional)
    const tokenCheckInterval = setInterval(() => {
      updateUser();
    }, 60000); // Check every minute

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(tokenCheckInterval);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        logout,
        login,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
