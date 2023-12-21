"use client";
import { ThemeProvider } from "next-themes";

export default function ThemeToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
