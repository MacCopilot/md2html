"use client";
import React, { useState } from "react";
import { getIndex, acccompare, compare } from "@/utils/compare_index";
import { BiChevronLeft, BiChevronDown } from "react-icons/bi";
import Link from "next/link";

import type { MenuStruct, SubMenuProps } from "@/types/interface";
export default function SubMenu({
  prefix,
  menus,
  layer,
  offset,
  SideBarIndex,
  setSideBarIndex,
}: SubMenuProps) {
  const [open, setOpen] = useState(Array(menus.length).fill(false));
  const [SideBarMaxWidth, setSideBarMaxWidth] = useState(100);
  function setOpenWrap(index: number) {
    let newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  }
  function setIndex(index: number) {
    localStorage.setItem("SideOpenIndex", JSON.stringify(index));
    setSideBarIndex(index);
  }
  return (
    <ul className="md:ml-4 ml-2 text-sm md:text-base lg:text-base font-base border-l border-slate-100 dark:border-slate-700">
      {menus.map((menu, index) =>
        menu.isdir ? (
          <li key={index}>
            <div className="">
              <div className="flex justify-between items-center md:py-2 py-1">
                <a
                  onClick={() => {
                    setOpenWrap(index);
                    setIndex(
                      getIndex(
                        layer,
                        offset * SideBarMaxWidth + index,
                        SideBarMaxWidth
                      )
                    );
                  }}
                  className={`${
                    layer == 1
                      ? "font-bold"
                      : layer == 2
                      ? "font-semibold"
                      : layer == 3
                      ? "font-medium"
                      : "font-normal"
                  } block border-l pl-6 md:pl-4 mr-6 scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto -ml-px cursor-pointer 
                      ${
                        acccompare(
                          SideBarIndex,
                          getIndex(
                            layer,
                            offset * SideBarMaxWidth + index,
                            SideBarMaxWidth
                          ),
                          SideBarMaxWidth
                        )
                          ? "text-sky-500 dark:text-sky-400 font-semibold"
                          : "text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-500"
                      }
                        ${
                          compare(
                            SideBarIndex,
                            getIndex(
                              layer,
                              offset * SideBarMaxWidth + index,
                              SideBarMaxWidth
                            ),
                            SideBarMaxWidth
                          )
                            ? "border-sky-500 dark:border-sky-400"
                            : "border-transparent hover:border-slate-400"
                        }
                    `}
                >
                  {" "}
                  {menu.title}
                </a>
                <div
                  className={`${(open[index] || !menu.sublayouts) && "hidden"}`}
                  onClick={() => {
                    setOpenWrap(index);
                  }}
                >
                  <BiChevronLeft className="hover:text-sky-500 duration-300 cursor-pointer md:h-4 md:w-4 h-6 w-6" />
                </div>
                <div
                  className={`${
                    (!open[index] || !menu.sublayouts) && "hidden"
                  }`}
                  onClick={() => {
                    setOpenWrap(index);
                  }}
                >
                  <BiChevronDown className="hover:text-sky-500 duration-300 cursor-pointer md:h-4 md:w-4 h-6 w-6" />
                </div>
              </div>
              {open[index] && (
                <div>
                  <SubMenu
                    prefix={prefix}
                    menus={menu.sublayouts}
                    layer={layer + 1}
                    offset={offset * SideBarMaxWidth + index}
                    SideBarIndex={SideBarIndex}
                    setSideBarIndex={setSideBarIndex}
                  />
                </div>
              )}
            </div>
          </li>
        ) : (
          <li key={index}>
            <div>
              <div className="flex justify-between items-center md:py-2 py-1">
                <Link
                  href={prefix + menu.href}
                  onClick={() => {
                    setIndex(
                      getIndex(
                        layer,
                        offset * SideBarMaxWidth + index,
                        SideBarMaxWidth
                      )
                    );
                  }}
                  className={`${
                    layer == 1
                      ? "font-semibold"
                      : layer == 2
                      ? "font-medium"
                      : layer == 3
                      ? "font-normal"
                      : "font-normal"
                  } block border-l pl-6 md:pl-4 mr-6 scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto -ml-px cursor-pointer 
                        ${
                          acccompare(
                            SideBarIndex,
                            getIndex(
                              layer,
                              offset * SideBarMaxWidth + index,
                              SideBarMaxWidth
                            ),
                            SideBarMaxWidth
                          )
                            ? "text-sky-500 dark:text-sky-400 font-semibold"
                            : "text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-500"
                        }
                          ${
                            compare(
                              SideBarIndex,
                              getIndex(
                                layer,
                                offset * SideBarMaxWidth + index,
                                SideBarMaxWidth
                              ),
                              SideBarMaxWidth
                            )
                              ? "border-sky-500 dark:border-sky-400"
                              : "border-transparent hover:border-slate-400"
                          }
                      `}
                >
                  {menu.title.slice(0, menu.title.length - 3)}
                </Link>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
