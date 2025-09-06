import './globals.css';
import React from 'react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/sidebar';
import { ThemeProvider } from '../components/ThemeContext';

export const metadata = {
  title: 'Cricket Dashboard',
  description: 'Player analytics app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          {/* Mobile: Stack vertically */}
          <div className="flex flex-col h-screen sm:flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />      
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body> 
    </html>
  );
}
