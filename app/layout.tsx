// app/layout.tsx or app/layout.js
"use client";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store/store"; // Import your Redux store
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MobileHandlerProvider } from "./utils/contexts/MobileHandler";
import "./globals.css";
import React from "react";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "CropGuard",
//   description: "CropGuard is a web application that helps farmers to manage their crops.",
//   icons: {
//     icon: "./favicon.ico",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hiddenPages = ["/signin", "/dashboard", "/forgot-password", "/signup"];
  const shouldHide = hiddenPages.includes(pathname);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <MobileHandlerProvider>
            {!shouldHide && <Header />}
            {children}
            {!shouldHide && <Footer />}
          </MobileHandlerProvider>
        </body>
      </html>
    </Provider>
  );
}
