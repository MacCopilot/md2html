"use client";
import SubMenu from "./SubMenu";
import { useContext, useEffect, useState } from "react";
import { backend_url } from "@/utils/env_variable";
import { MenuStruct } from "@/types/interface";
import { Transition } from "@headlessui/react";
import { SideBarContext } from "@/providers/SideBarProvider";
import RepoSideBarLink from "./RepoSideBarLink";
import SideBarLoading from "../loadings/SideBarLoading";
export async function getPublicRepoLayout() {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `${backend_url}/layout.layout`
  console.log("sidebar url:",url)
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
interface ContentSideBarProps {
  sublayouts:MenuStruct[]
}

export default function RepoSideBar(props: ContentSideBarProps) {
  const [SideBarIndex, setSideBarIndex] = useState(-1);
  const [layout, setLayout] = useState<MenuStruct[]>([]);
  const { sideBarOpen, setSideBarOpen } = useContext(SideBarContext);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
      // getPublicRepoLayout().then((data) => {
      //   setLayout(data.sublayouts);
      //   setLoading(false);
      // });
      setLayout(props.sublayouts)
      setLoading(false)
      const sideIndex = localStorage.getItem("SideOpenIndex");
      if (sideIndex) {
        const data = JSON.parse(sideIndex);
        setSideBarIndex(data);
      }
  }, []);
  if(loading){
    return <SideBarLoading sideBarOpen={sideBarOpen}/>
  }
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
        <div className="fixed lg:hidden z-40 inset-0 w-full    bg-black/20 backdrop-blur-sm dark:bg-slate-900/25"></div>
      </Transition.Child>

      {/* Sliding sidebar */}
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className={`fixed z-40 inset-0 left-[max(0px,calc(50%-52rem))] w-[20rem]  
        top-[2rem] lg:top-[3.8125rem]  
        px-4 pb-10 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2`}
      >
        <div className="sticky top-0 -ml-0.5 pointer-events-none">
          <div className="h-10 bg-white dark:bg-slate-900"></div>
          <div className="bg-white dark:bg-slate-900 relative pointer-events-auto">
            {/* <SearchRepoButton repo_user_id={repoUserID} repoid={repoid} isPublic={isPublic} /> */}
          </div>
          <div className="h-4 bg-gradient-to-b  from-white dark:from-slate-900"></div>
        </div>
        <RepoSideBarLink/>
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
