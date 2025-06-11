"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      className="border px-4 py-2 rounded"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Toggle Theme ({theme})
    </button>
  );
}
