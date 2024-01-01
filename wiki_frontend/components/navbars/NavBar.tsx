import React from "react";
import Link from "next/link";
import Image from "next/image";
import SideBarToggle from "@/components/sidebars/SideBarToggle";
import NavTheme from "@/components/navbars/NavTheme";
import NavLang from "./NavLang";
import { Locale } from "@/i18n-config";
interface NavBarProps {
  lang: Locale;
}
export default function NavBar(props: NavBarProps) {
  return (
    <div
      className="fixed top-0 z-50 w-full 
        backdrop-blur supports-backdrop-blur:bg-white/60
        lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] 
        bg-transparent text-slate-500 dark:text-slate-200
        flex flex-row justify-between items-center 
        py-2 px-2 lg:px-8
        "
    >
      <div className="flex flex-row items-center md:pl-4 md:pr-3.5">
        <SideBarToggle />
        <Link
          href={`/${props.lang}`}
          className="flex items-center justify-center space-x-2 overflow-hidden cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="Picture of logo"
            className="w-6 h-6 md:w-9 md:h-9 my-2  rounded-md"
            width={36}
            height={36}
          />
          <p className="font-bold text-xl md:text-2xl">
            MD
            <span className="text-blue-500 dark:text-blue-400">Lite</span>
          </p>
        </Link>
      </div>

      <div className="flex gap-x-2 md:gap-x-3 justify-center items-center px-1 md:px-6	mx-3 md:mx-6  md:border-l border-slate-300 dark:border-slate-400">
        <NavTheme />
        <NavLang />
      </div>
    </div>
  );
}
