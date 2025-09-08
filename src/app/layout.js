import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Dick",
  description: "dick dick dick",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <Header/>
      <main className="p-6">{children}</main>
    </body>
    </html>
  );
}
