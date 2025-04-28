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

import "./globals.css";

const hiddenPages = [
  "/signin",
  "/dashboard",
  "/dashboard/farmDashboard",
  "/dashboard/ai",
  "/dashboard/chat",
  "/dashboard/community",
  "/dashboard/live",
  "/dashboard/admin",
  "/forgot-password",
  "/signup",
];

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHide = hiddenPages.includes(pathname);

  return (
    <>
      {!shouldHide && <Header />}
      {children}
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
      <body>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="806052617207-h9sqqe0q9ivl7g660deofptssgus6593.apps.googleusercontent.com">
            <SessionProvider>
              <AuthProvider>
                <MobileHandlerProvider>
                  <DataFetchProvider>
                    <LoadingWrapper minimumLoadTime={800} message="Loading...">
                      <AppContent>{children}</AppContent>
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
