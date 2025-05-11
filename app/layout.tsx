import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/themeContext";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md Imran Hossain",
  description: "A portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="bg-white dark:bg-gray-900">
      <body className="bg-white text-gray-900">
        <UserProvider>
          <ThemeProvider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );

}

