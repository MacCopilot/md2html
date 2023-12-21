"use client";

import React, { useContext } from "react";
import { SideBarContext } from "@/providers/SideBarProvider";
interface ListGroupWrapperProps {
  children: React.ReactNode;
}

export default function ListGroupWrapper(props: ListGroupWrapperProps) {
  const { sideBarOpen } = useContext(SideBarContext);
  return (
    <div className="flex  items-center justify-center">
      <div
        className={`relative z-5 pt-8 px-4 lg:px-8 mb-4 min-h-screen  w-full mx-atuo top-[2rem] lg:top-[3rem] 
        ${
          sideBarOpen
            ? "lg:max-w-[min(calc(100%-30rem),64rem)] lg:left-[max(100px,calc(50%-32rem))] 2xl:left-0  2xl:max-w-[min(calc(100%-40rem),64rem)]"
            : "lg:max-w-[min(calc(100%-20rem),64rem)]"
        }
      `}
      >
        {props.children}
      </div>
    </div>
  );
}
