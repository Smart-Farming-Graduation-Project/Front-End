import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MobileHandlerProvider } from "./utils/contexts/MobileHandler";

export const metadata: Metadata = {
  title: "CropPilot",
  description: "CropPilot is a web application that helps farmers to manage their crops.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MobileHandlerProvider>
          <Header />
          {children}
          <Footer />
        </MobileHandlerProvider>
      </body>
    </html>
  );
}
