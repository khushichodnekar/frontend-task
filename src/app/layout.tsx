import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import DarkModeToggle from "./components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "dashboard",
  description: "Testing dark mode",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="p-4 flex justify-end border-b border-gray-200 dark:border-gray-700">
            <DarkModeToggle />
          </header>
          <main className="min-h-[calc(100vh-68px)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}