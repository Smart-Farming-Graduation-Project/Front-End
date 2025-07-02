"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
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
  Role: string[];
  iss: string;
  jti: number;
  exp: number;
}

interface AuthContextType {
  user: TokenType | null;
  isLoading: boolean;
  logout: () => void;
  login: (accessToken: string, refreshTokenValue: string) => void;
  refreshUserToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {},
  login: () => {},
  refreshUserToken: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TokenType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateUser = useCallback((token: string) => {
    try {
      const decoded = jwtDecode<TokenType>(token);

      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.log("Token expired during update");
        setUser(null);
        deleteTokenClient();
        return;
      }

      setUser(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
      deleteTokenClient();
    }
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out user");
    deleteTokenClient();
    setUser(null);
    signOut({ callbackUrl: "/signin" });
  }, []);

  const refreshUserToken = useCallback(async (): Promise<boolean> => {
    if (isRefreshing) {
      return false;
    }

    setIsRefreshing(true);
    
    try {
      const currentAccessToken = Cookies.get("token");
      const currentRefreshToken = Cookies.get("refreshToken");

      if (!currentAccessToken || !currentRefreshToken) {
        console.log("No tokens available for refresh");
        setUser(null);
        deleteTokenClient();
        setIsRefreshing(false);
        return false;
      }

      console.log("Attempting to refresh token...");
      const response = await refreshToken(currentAccessToken, currentRefreshToken);
      
      console.log("Refresh response received:", response);

      // Check for different possible response structures
      let accessToken, newRefreshToken;
      
      if (response.statusCode === 200 || response.status === 200) {
        // Try different possible response structures
        if (response.data?.tokens) {
          // Structure: { statusCode: 200, data: { tokens: { accessToken, refreshToken } } }
          accessToken = response.data.tokens.accessToken;
          newRefreshToken = response.data.tokens.refreshToken;
        } else if (response.tokens) {
          // Structure: { statusCode: 200, tokens: { accessToken, refreshToken } }
          accessToken = response.tokens.accessToken;
          newRefreshToken = response.tokens.refreshToken;
        } else if (response.data?.accessToken) {
          // Structure: { statusCode: 200, data: { accessToken, refreshToken } }
          accessToken = response.data.accessToken;
          newRefreshToken = response.data.refreshToken;
        } else if (response.accessToken) {
          // Structure: { statusCode: 200, accessToken, refreshToken }
          accessToken = response.accessToken;
          newRefreshToken = response.refreshToken;
        }
        
        if (accessToken && newRefreshToken) {
          // Set new tokens
          Cookies.set("token", accessToken, { expires: 7 });
          Cookies.set("refreshToken", newRefreshToken, { expires: 30 });
          
          // Update user with new token
          updateUser(accessToken);
          
          console.log("Token refreshed successfully");
          setIsRefreshing(false);
          return true;
        } else {
          console.log("Token refresh failed - tokens not found in response structure");
          console.log("Expected tokens but got:", response);
          logout();
          setIsRefreshing(false);
          return false;
        }
      } else {
        console.log("Token refresh failed - invalid status code:", response.statusCode || response.status);
        logout();
        setIsRefreshing(false);
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      setIsRefreshing(false);
      return false;
    }
  }, [isRefreshing, updateUser, logout]);

  const login = useCallback((accessToken: string, refreshTokenValue: string) => {
    Cookies.set("token", accessToken, { expires: 7 });
    Cookies.set("refreshToken", refreshTokenValue, { expires: 30 });
    updateUser(accessToken);
  }, [updateUser]);

  const isTokenExpired = useCallback((token: string): boolean => {
    try {
      const decoded = jwtDecode<TokenType>(token);
      const currentTime = Date.now() / 1000;
      
      // Token is expired if current time is past expiration
      return decoded.exp <= currentTime;
    } catch {
      return true;
    }
  }, []);

  const isTokenExpiringSoon = useCallback((token: string): boolean => {
    try {
      const decoded = jwtDecode<TokenType>(token);
      const currentTime = Date.now() / 1000;
      
      // Token is expiring soon if it expires within 5 minutes (300 seconds)
      return decoded.exp - currentTime < 300;
    } catch {
      return true;
    }
  }, []);

  // Initialize user on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const currentToken = getTokenClient();
      const currentRefreshToken = Cookies.get("refreshToken");
      
      if (!currentToken || !currentRefreshToken) {
        setIsLoading(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(currentToken)) {
        console.log("Token expired, attempting refresh...");
        const refreshed = await refreshUserToken();
        if (!refreshed) {
          console.log("Failed to refresh expired token");
        }
      } else {
        // Token is valid, update user
        updateUser(currentToken);
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, [isTokenExpired, refreshUserToken, updateUser]);

  // Set up automatic token refresh interval
  useEffect(() => {
    if (!user || isRefreshing) return;

    const checkTokenAndRefresh = async () => {
      const token = getTokenClient();
      if (!token) return;

      if (isTokenExpired(token)) {
        console.log("Token expired, refreshing...");
        await refreshUserToken();
      } else if (isTokenExpiringSoon(token)) {
        console.log("Token expiring soon, refreshing...");
        await refreshUserToken();
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenAndRefresh, 60000);

    return () => clearInterval(interval);
  }, [user, isRefreshing, isTokenExpired, isTokenExpiringSoon, refreshUserToken]);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, login, refreshUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
