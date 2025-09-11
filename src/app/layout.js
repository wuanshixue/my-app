import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import { getAllPosts } from "@/lib/posts";

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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({ children }) {
  const posts = getAllPosts(); // ✅ 服务端取 posts

  return (
    <html lang="en">
    <body className="bg-gray-50 text-gray-800 font-sans">
      <Navbar posts={posts} />

      <div className="container mx-auto px-4">
        <main className="max-w-3xl mx-auto p-6">
          <header className="text-center mb-8 pb-4 border-b">
            <h1 className="text-3xl font-serif font-bold">Coffee Wuanshixue</h1>
            <p className="text-gray-600 text-lg mt-1">Coffee: Music in a cup!</p>
          </header>
          {children}
        </main>
      </div>

      <footer className="text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()}Coffee Wuanshixue. All rights reserved.
      </footer>
    </body>
    </html>
  );
}
