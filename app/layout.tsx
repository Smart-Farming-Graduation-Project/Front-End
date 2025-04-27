"use client";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store/store"; // Import your Redux store
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MobileHandlerProvider } from "./utils/contexts/MobileHandler";
import "./globals.css";
import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./utils/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hiddenPages = ["/signin", "/dashboard", "/dashboard/farmDashboard", "/dashboard/ai", "/dashboard/chat", "/dashboard/community", "/dashboard/live", "/dashboard/admin", "/forgot-password", "/signup"];
  const shouldHide = hiddenPages.includes(pathname);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <AuthProvider>
            <MobileHandlerProvider>
              {!shouldHide && <Header />}
              {children}
              {!shouldHide && <Footer />}
            </MobileHandlerProvider>
          </AuthProvider>
        </body>
      </html>
    </Provider>
  );
}
