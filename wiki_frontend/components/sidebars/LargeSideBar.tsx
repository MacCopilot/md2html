"use client";
import SubMenu from "./SubMenu";
import SearchButton from "@/components/sidebars/SearchButton";
import { useEffect, useState } from "react";
import { MenuStruct } from "@/types/interface";

interface LargeSideBarProps {
  sublayouts: MenuStruct[];
}

export default function LargeSideBar(props: LargeSideBarProps) {
  const [SideBarIndex, setSideBarIndex] = useState(-1);
  useEffect(() => {
    const sideIndex = localStorage.getItem("SideOpenIndex");
    if (sideIndex) {
      const data = JSON.parse(sideIndex);
      console.log("data index is:", data);
      setSideBarIndex(data);
    }
  }, []);
  return (
    <div
      className={`hidden xl:block fixed left-[max(0px,calc(50%-50rem))] z-40 inset-0 w-[20rem] top-0 pt-8 lg:pt-16 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2`}
    >
      <div className="sticky top-0 -ml-0.5 pointer-events-none">
        <div className="h-10 bg-white dark:bg-slate-900"></div>
        <div className="bg-white dark:bg-slate-900 relative pointer-events-auto">
          <SearchButton />
        </div>
        <div className="h-4 bg-gradient-to-b from-white dark:from-slate-900"></div>
      </div>
      <div className="-ml-2 md:-ml-4">
        <SubMenu
          prefix={"/docs/"}
          menus={props.sublayouts}
          layer={1}
          offset={0}
          SideBarIndex={SideBarIndex}
          setSideBarIndex={setSideBarIndex}
        />
      </div>
    </div>
  );
}
