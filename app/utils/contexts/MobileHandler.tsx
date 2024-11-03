"use client";
import { createContext, useContext, useEffect, useState } from "react";

const MobileHandlerContext = createContext<{ isMobile: boolean | undefined }>({ isMobile: undefined });
const MobileHandlerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const isMobileHandler = (e: MediaQueryListEvent) => {
    setIsMobile(e.matches);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:768px)");
    mediaQuery.addEventListener("change", isMobileHandler);
    setIsMobile(mediaQuery.matches);
  }, []);
  return <MobileHandlerContext.Provider value={{ isMobile }}>{children}</MobileHandlerContext.Provider>;
};
export { MobileHandlerProvider, MobileHandlerContext };
export const useMobileContext = () => {
  return useContext(MobileHandlerContext);
};
