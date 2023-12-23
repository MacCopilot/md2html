"use client";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import React from "react";

export default function RepoSideBarLink() {
  return (
    <div className="mb-8 md:mt-0 text-lg font-bold	">
      <Link
        href={`/docs/readme`}
        className="group flex items-center lg:text-sm lg:leading-6 mb-4 
        font-medium text-slate-700 hover:text-sky-500 dark:text-slate-400 dark:hover:text-slate-300"
      >
        <div
          className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 
          group-hover:shadow-teal-200 dark:group-hover:bg-teal-500 dark:bg-slate-800 dark:highlight-white/5"
        >
          <AiOutlineHome className={`h-6 w-6 p-1`} />
        </div>
        仓库主页
      </Link>
    </div>
  );
}
