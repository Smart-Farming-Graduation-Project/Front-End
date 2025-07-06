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

const LoadingWrapper = ({ children, minimumLoadTime = 300 }: LoadingWrapperProps) => {
  const { isLoading: authLoading } = useAuth();
  const [delayElapsed, setDelayElapsed] = useState(false);
  const [routeChanging, setRouteChanging] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);

  const pathname = usePathname();

  // Handle minimum load time - reduced from 1200ms to 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayElapsed(true);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  // Track route changes - optimized to avoid unnecessary loading screens
  useEffect(() => {
    // If pathname changes and we have a previous pathname
    if (prevPathname !== null && prevPathname !== pathname) {
      // Only show loading for navigation between major sections
      const prevMainPath = prevPathname.split("/")[1];
      const currentMainPath = pathname.split("/")[1];

      // Only show loading when navigating between major sections
      if (prevMainPath !== currentMainPath) {
        setRouteChanging(true);

        // Reduced delay from 500ms to 200ms
        const timer = setTimeout(() => {
          setRouteChanging(false);
        }, 200);

        return () => clearTimeout(timer);
      }
    }

    // Store current pathname
    setPrevPathname(pathname);
  }, [pathname, prevPathname]);

  // Show loading only for auth loading or major route changes
  if (authLoading || !delayElapsed || routeChanging) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
