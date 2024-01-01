"use client";

import React, { useContext } from "react";
import { SideBarContext } from "@/providers/SideBarProvider";
interface ListGroupWrapperProps {
  children: React.ReactNode;
}

export default function ListGroupWrapper(props: ListGroupWrapperProps) {
  const { sideBarOpen } = useContext(SideBarContext);
  return (

    <div className="sticky z-40 inset-0 top-[5rem] px-8  overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2">
        <div className="h-10 bg-white dark:bg-slate-900"></div>
        {props.children}
    </div>
  );
}
