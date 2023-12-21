"use client";
import React, { useContext, useState, useEffect } from "react";
import { SideBarContext } from "@/providers/SideBarProvider";
import { RiMenu4Line, RiMenuLine } from "react-icons/ri";
function SideBarToggle() {
  const { sideBarOpen, setSideBarOpen } = useContext(SideBarContext);
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(sideBarOpen);

  // 在组件加载时从localStorage中读取值, set mounted
  useEffect(() => {
    const storedValue = localStorage.getItem("sidebarValue");
    if (storedValue !== null && storedValue != undefined) {
      setValue(JSON.parse(storedValue));
    }
    setMounted(true);
  }, []);

  // 在值改变时更新localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sidebarValue", JSON.stringify(value));
      setSideBarOpen(value);
    }
  }, [value]);

  const handleChangeValue = () => {
    setValue(!value);
  };
  if (!mounted) {
    return (
      <div className="block mr-2 md:mr-3 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700 w-7 h-7" />
    );
  }

  const IconText = ({ Icon, onClick }: { Icon: any; onClick: () => void }) => (
    <Icon
      onClick={onClick}
      className="mr-2 md:mr-3 block w-7 h-7  dark:text-slate-200  hover:text-sky-500  cursor-pointer"
    />
  );
  return (
    <IconText
      Icon={sideBarOpen === false ? RiMenuLine : RiMenu4Line}
      onClick={handleChangeValue}
    />
  );
}

export default SideBarToggle;
