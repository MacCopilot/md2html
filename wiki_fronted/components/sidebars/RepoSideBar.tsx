"use client";
import SubMenu from "./SubMenu";
import SearchButton from "@/components/sidebars/SearchButton";
import { useContext, useEffect, useState } from "react";
import { MenuStruct } from "@/types/interface";
import { Transition } from "@headlessui/react";
import { SideBarContext } from "@/providers/SideBarProvider";
import RepoSideBarLink from "./RepoSideBarLink";

interface ContentSideBarProps {
  sublayouts: MenuStruct[];
}

export default function RepoSideBar(props: ContentSideBarProps) {
  const [SideBarIndex, setSideBarIndex] = useState(-1);
  const [layout, setLayout] = useState<MenuStruct[]>([]);
  const { sideBarOpen, setSideBarOpen } = useContext(SideBarContext);
  useEffect(() => {
    setLayout(props.sublayouts);
    const sideIndex = localStorage.getItem("SideOpenIndex");
    if (sideIndex) {
      const data = JSON.parse(sideIndex);
      setSideBarIndex(data);
    }
  }, []);
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
      </Transition.Child>
    </Transition>
  );
}
