"use client";

import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallbackUrl?: string;
  guardMessage?: string;
}

const AuthGuard = ({ 
  children, 
  fallbackUrl = "/signin", 
  guardMessage = "Please sign in to access this page" 
}: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after loading is complete and user is confirmed not logged in
    if (!isLoading && !user) {
      toast.error(guardMessage);
      router.push(fallbackUrl);
    }
  }, [user, isLoading, router, fallbackUrl, guardMessage]);

  // Show a loading state or nothing while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green"></div>
    </div>;
  }

  // If not authenticated, don't render the protected content
  if (!user) {
    return null;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default AuthGuard;