"use client";
import SubMenu from "./SubMenu";
import SearchButton from "@/components/sidebars/SearchButton";
import SideBarTransition from "./SideBarTransition";
import { useContext, useEffect, useState } from "react";
import { MenuStruct } from "@/types/interface";

interface ContentSideBarProps {
  sublayouts: MenuStruct[];
}

export default function RepoSideBar(props: ContentSideBarProps) {
  const [SideBarIndex, setSideBarIndex] = useState(-1);
  const [layout, setLayout] = useState<MenuStruct[]>([]);
  useEffect(() => {
    setLayout(props.sublayouts);
    const sideIndex = localStorage.getItem("SideOpenIndex");
    if (sideIndex) {
      const data = JSON.parse(sideIndex);
      setSideBarIndex(data);
    }
  }, []);
  return (
    <SideBarTransition>
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
          menus={layout}
          layer={1}
          offset={0}
          SideBarIndex={SideBarIndex}
          setSideBarIndex={setSideBarIndex}
        />
      </div>
    </SideBarTransition>
  );
}
