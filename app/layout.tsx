"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";

import { store } from "./utils/redux/store/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MobileHandlerProvider } from "./utils/contexts/MobileHandler";
import { AuthProvider } from "./utils/contexts/AuthContext";
import LoadingWrapper from "./utils/contexts/LoadingWrapper";
import DataFetchProvider from "./utils/contexts/DataFetchProvider";
import ProtectedRouteProvider from "./utils/contexts/ProtectedRouteProvider";
import AdminGuard from "./utils/contexts/AdminGuard";
import DataInitializer from "./utils/contexts/DataInitializer";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import "./utils/api/axiosInterceptor";

const hiddenPages = [
  "/signin",
  "/dashboard",
  "/dashboard/farmAlerts",
  "/dashboard/farmDashboard",
  "/dashboard/ai",
  "/dashboard/chat",
  "/dashboard/community",
  "/dashboard/live",
  "/dashboard/admin",
  "/dashboard/rovers",
  "/dashboard/predictions",
  "/forgot-password",
  "/signup",
  "/profile",
];

const adminPathPatterns = [/^\/dashboard\/admin(\/.*)?$/];
const protectedPages = ["/cart", "/wishlist", "/checkout"];
const hiddenPathPatterns = [/^\/dashboard\/community\/\d+$/];
const protectedPathPatterns = [/^\/checkout\/.*$/];

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isExactMatch = hiddenPages.includes(pathname || "");
  const isPatternMatch =
    pathname && hiddenPathPatterns.some((pattern) => pattern.test(pathname));
  const isAdminRoute =
    pathname && adminPathPatterns.some((pattern) => pattern.test(pathname));

  const shouldHide = isExactMatch || isPatternMatch;

  let content = children;

  content = (
    <ProtectedRouteProvider
      protectedPaths={protectedPages}
      protectedPathPatterns={protectedPathPatterns}
    >
      {content}
    </ProtectedRouteProvider>
  );

  if (isAdminRoute) {
    content = <AdminGuard>{content}</AdminGuard>;
  }

  return (
    <>
      <DataInitializer />
      {!shouldHide && <Header />}
      {content}
      {!shouldHide && <Footer />}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Crop Guard | Smart Farming Solution</title>
        <meta
          name="description"
          content="Crop Guard - Protecting your crops, securing your future"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="806052617207-h9sqqe0q9ivl7g660deofptssgus6593.apps.googleusercontent.com">
            <SessionProvider>
              <AuthProvider>
                <MobileHandlerProvider>
                  <DataFetchProvider>
                    <LoadingWrapper minimumLoadTime={300} message="Loading...">
                      <AppContent>{children}</AppContent>
                      <Toaster />
                    </LoadingWrapper>
                  </DataFetchProvider>
                </MobileHandlerProvider>
              </AuthProvider>
            </SessionProvider>
          </GoogleOAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
