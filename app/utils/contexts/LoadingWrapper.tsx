"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/components/utils/Loading";
import { useAuth } from "./AuthContext";
import { usePathname } from "next/navigation";

interface LoadingWrapperProps {
  children: React.ReactNode;
  minimumLoadTime?: number;
  message?: string;
}

const LoadingWrapper = ({ children, minimumLoadTime = 1200}: LoadingWrapperProps) => {
  const { isLoading: authLoading } = useAuth();
  const [delayElapsed, setDelayElapsed] = useState(false);
  const [routeChanging, setRouteChanging] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  
  const pathname = usePathname();
  
  // Handle minimum load time
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayElapsed(true);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  // Track route changes
  useEffect(() => {
    // If pathname changes and we have a previous pathname, show loading
    if (prevPathname !== null && prevPathname !== pathname) {
      setRouteChanging(true);
      
      // Hide loading after a short delay
      const timer = setTimeout(() => {
        setRouteChanging(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Store current pathname
    setPrevPathname(pathname);
  }, [pathname, prevPathname]);

  // Show loading if any loading condition is true
  if (authLoading || !delayElapsed || routeChanging) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
