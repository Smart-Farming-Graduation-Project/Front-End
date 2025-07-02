"use client";

import { usePathname } from "next/navigation";
import AuthGuard from "./AuthGuard";
import { ReactNode } from "react";

interface ProtectedRouteProviderProps {
  children: ReactNode;
  protectedPaths: string[];
  protectedPathPatterns?: RegExp[];
}

export default function ProtectedRouteProvider({
  children,
  protectedPaths,
  protectedPathPatterns = [],
}: ProtectedRouteProviderProps) {
  const pathname = usePathname();

  // Check if current path is protected
  const isExactMatch = protectedPaths.includes(pathname || "");
  const isPatternMatch = pathname 
    ? protectedPathPatterns.some(pattern => pattern.test(pathname)) 
    : false;
  
  const isProtected = isExactMatch || isPatternMatch;

  if (isProtected) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return <>{children}</>;
}