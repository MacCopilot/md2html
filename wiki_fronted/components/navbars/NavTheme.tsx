"use client";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div className="block animate-pulse rounded-full bg-slate-300 dark:bg-slate-700 w-7 h-7" />
    );
  }
  const IconText = ({ Icon, onClick }: { Icon: any; onClick: () => void }) => (
    <Icon
      onClick={onClick}
      className="block w-7 h-7  hover:text-sky-500 cursor-pointer"
    />
  );

  return (
    <IconText
      Icon={theme === "dark" ? MdDarkMode : MdLightMode}
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    />
  );
}
