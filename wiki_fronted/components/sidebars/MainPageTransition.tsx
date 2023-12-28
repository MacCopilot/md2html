"use client";

import React, { useContext } from "react";
import { SideBarContext } from "@/providers/SideBarProvider";
import { Transition } from "@headlessui/react";

interface MainPageTransitionProps {
  children: React.ReactNode;
}

export default function MainPageTransition(props: MainPageTransitionProps) {
  const { sideBarOpen } = useContext(SideBarContext);
  return (

    <div className={`${!sideBarOpen && "ml-[20rem]"}  border-2 border-teal-400`}>
      {props.children}
    </div>
  );
}
