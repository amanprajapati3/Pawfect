import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/section/header/Header";
import Footer from "./components/section/footer/Footer";
import SmoothScroll from "./components/shared/SmoothScroll";
import CustomCursor from "./components/shared/CustomCursor";

export const metadata: Metadata = {
  title: "PawFect",
  description: "PawFect Happy Pets, Happy Lives",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full overflow-x-clip antialiased"
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
         <CustomCursor />
        <SmoothScroll/>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
