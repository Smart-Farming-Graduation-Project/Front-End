"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MobileHandlerProvider } from "./utils/contexts/MobileHandler";
import { AuthProvider } from "./utils/contexts/AuthContext";
import "./globals.css";
import React from "react";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoadingWrapper from "./utils/contexts/LoadingWrapper";
import DataFetchProvider from "./utils/contexts/DataFetchProvider";

// Create a wrapper component to handle authentication loading
function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
  const shouldHide = hiddenPages.includes(pathname);

  return (
    <LoadingWrapper minimumLoadTime={800} message="Loading...">
      <>
        {!shouldHide && <Header />}
        {children}
        {!shouldHide && <Footer />}
      </>
    </LoadingWrapper>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
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
  const shouldHide = hiddenPages.includes(pathname);

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="806052617207-h9sqqe0q9ivl7g660deofptssgus6593.apps.googleusercontent.com">
        <SessionProvider>
          <html lang="en">
            <body>
              <AuthProvider>
                <MobileHandlerProvider>
                  {!shouldHide && <Header />}
                  {children}
                  {!shouldHide && <Footer />}
                  <DataFetchProvider>
                    <AppContent>{children}</AppContent>
                  </DataFetchProvider>
                </MobileHandlerProvider>
              </AuthProvider>
            </body>
          </html>
        </SessionProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}
