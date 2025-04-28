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
import LoadingWrapper from "./utils/contexts/LoadingWrapper";
import DataFetchProvider from "./utils/contexts/DataFetchProvider";

// Create a wrapper component to handle authentication loading
function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hiddenPages = ["/signin", "/dashboard", "/dashboard/farmDashboard", "/dashboard/ai", "/dashboard/chat", "/dashboard/community", "/dashboard/live", "/dashboard/admin", "/forgot-password", "/signup"];
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
  return (
    <Provider store={store}>
      <SessionProvider>
        <html lang="en">
          <body>
            <AuthProvider>
              <MobileHandlerProvider>
                <DataFetchProvider>
                  <AppContent>{children}</AppContent>
                </DataFetchProvider>
              </MobileHandlerProvider>
            </AuthProvider>
          </body>
        </html>
      </SessionProvider>
    </Provider>
  );
}