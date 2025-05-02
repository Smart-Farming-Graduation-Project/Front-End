"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import Head from "next/head";

import { store } from "./utils/redux/store/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MobileHandlerProvider } from "./utils/contexts/MobileHandler";
import { AuthProvider } from "./utils/contexts/AuthContext";
import LoadingWrapper from "./utils/contexts/LoadingWrapper";
import DataFetchProvider from "./utils/contexts/DataFetchProvider";

import "./globals.css";

const hiddenPages = ["/signin", "/dashboard", "/dashboard/farmDashboard", "/dashboard/ai", "/dashboard/chat", "/dashboard/community", "/dashboard/live", "/dashboard/admin", "/forgot-password", "/signup"];

const hiddenPathPatterns = [/^\/dashboard\/community\/\d+$/];

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isExactMatch = hiddenPages.includes(pathname);
  const isPatternMatch = pathname && hiddenPathPatterns.some((pattern) => pattern.test(pathname));

  const shouldHide = isExactMatch || isPatternMatch;

  return (
    <>
      {!shouldHide && <Header />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Crop Guard | Smart Farming</title>
        <meta name="description" content="Crop Guard - Protecting your crops, securing your future" />
        <link rel="icon" href="/favicon.ico" />
      </head>
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
