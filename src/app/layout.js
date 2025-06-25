'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { useSelectedLayoutSegment } from 'next/navigation'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const segment = useSelectedLayoutSegment()
  
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {segment !== 'dashboard' && <Header/>}
        {children}
        {segment !== 'dashboard' && <Footer/>}
      </body>
    </html>
  );
}
