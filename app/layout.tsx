// app/layout.tsx or app/layout.js
"use client"
import { Provider } from "react-redux";
import { store } from "./utils/redux/store/store"; // Import your Redux store
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MobileHandlerProvider } from "./utils/contexts/MobileHandler";
import "./globals.css";

// export const metadata = {
//   title: "CropPilot",
//   description: "CropPilot is a web application that helps farmers to manage their crops.",
//   icons: {
//     icon: "./favicon.ico",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <MobileHandlerProvider>
            <Header />
            {children}
            <Footer />
          </MobileHandlerProvider>
        </body>
      </html>
    </Provider>
  );
}
