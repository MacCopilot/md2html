"use client";

import React, { useContext } from "react";
import { SideBarContext } from "@/providers/SideBarProvider";
import { Transition } from "@headlessui/react";

interface SideBarTransitionProps {
  children: React.ReactNode;
}

export default function SideBarTransition(props: SideBarTransitionProps) {
  const { sideBarOpen } = useContext(SideBarContext);
  return (
    <Transition show={sideBarOpen}>
      {/* Background overlay */}
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-100"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-100"
      >
        <div className="fixed lg:hidden z-40 inset-0 w-full bg-black/20 backdrop-blur-sm dark:bg-slate-900/25"></div>
      </Transition.Child>
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-full opacity-0"
        className={`sticky h-[calc(100vh-120px)] z-40 inset-0 left-[max(0px,calc(50%-52rem))] w-[20rem] top-[5rem] px-4  overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2`}
      >
        {props.children}
      </Transition.Child>
    </Transition>
  );
}
