// src/app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard/profile"
            className={`py-2 px-4 rounded ${
              active === "/dashboard/profile"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/dashboard/agent"
            className={`py-2 px-4 rounded ${
              active === "/dashboard/agent"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            Agent
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
