import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Coffee Bolg",
  description: "Coffee Bolg",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className="bg-gray-50 text-gray-800 font-sans">
      <Navbar />


      <main className="max-w-3xl mx-auto p-6">{children}</main>
      <footer className="text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()}Coffee Wuanshixue. All rights reserved.
      </footer>
    </body>
    </html>
  );
}
