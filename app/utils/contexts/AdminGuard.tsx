"use client";

import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { ReactNode } from "react";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // First check if user is authenticated
    if (!isLoading && !user) {
      toast.error("Please sign in to access the admin dashboard");
      router.push("/signin");
      return;
    }
    
    // Then check if user has Admin role in the Role array
    const isAdmin = user?.Role && Array.isArray(user.Role) && user.Role.includes("Admin");
    if (!isLoading && user && !isAdmin) {
      toast.error("You don't have permission to access the admin dashboard");
      router.push("/");
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green"></div>
      </div>
    );
  }

  // Don't render content if not authenticated or not admin
  const isAdmin = user?.Role && Array.isArray(user.Role) && user.Role.includes("Admin");
  if (!user || !isAdmin) {
    return null;
  }

  // If authenticated and admin, render the children
  return <>{children}</>;
};

export default AdminGuard;
