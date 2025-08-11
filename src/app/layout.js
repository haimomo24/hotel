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
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ colorScheme: 'light' }}
      >
        {segment !== 'dashboard' && <Header/>}
        {children}
        {segment !== 'dashboard' && <Footer/>}

        {/* Floating Contact Buttons - Góc phải gần cuối màn hình */}
        {segment !== 'dashboard' && (
          <div className="fixed right-4 bottom-20 z-50">
            <div className="flex flex-col space-y-3">
              
              {/* Hotline Button */}
              <div className="group relative">
                <a 
                  href="tel:02293868789"
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </a>
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Hotline: 02293868789
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black"></div>
                </div>
              </div>

              {/* Zalo Button */}
              <div className="group relative">
                <a 
                  href="https://zalo.me/0123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">Z</span>
                  </div>
                </a>
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Chat Zalo
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black"></div>
                </div>
              </div>

              {/* Messenger Button */}
              <div className="group relative">
                <a 
                  href="https://www.facebook.com/chuabaidinh35"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.145 2 11.25c0 2.9 1.309 5.49 3.375 7.31V22l3.31-1.82c.88.24 1.82.37 2.815.37 5.523 0 10-4.145 10-9.25S17.523 2 12 2zm1.09 12.44l-2.54-2.71L6.77 14.44l4.95-5.25 2.54 2.71 3.78-2.71-4.95 5.25z"/>
                  </svg>
                </a>
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Facebook Messenger
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black"></div>
                </div>
              </div>

            </div>
          </div>
        )}
      </body>
    </html>
  );
}
