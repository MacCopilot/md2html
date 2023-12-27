// "use client";
// import parse from "html-react-parser";

// import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactHtmlParser = dynamic(() => import("@/components/ReactHtmlParser"));

// import {
//   domToReact,
//   attributesToProps,
//   DOMNode,
//   Element,
//   HTMLReactParserOptions,
// } from "html-react-parser";

// import ListGroupWrapper from "./wrappers/ListGroupWrapper";
import ContentSideBar from "./sidebars/ContentSideBar";
import HtmlParser from "@/components/HtmlParser";
interface WikiInfoProps {
  sectionIds: string[];
  markdownlist: string;
  markdowntext: string;
  parsedRepoId: number;
  prefixPath: string;
  NavBarOpen: boolean;
  markdown_id: number;
  isPublic: boolean;
}
export default function WikiInfo(props: WikiInfoProps) {
  return (
    <div className="flex-auto sticky z-40 inset-0 top-[5rem] px-8 xl:px-12  overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900">
      <div className="h-10 bg-white dark:bg-slate-900"></div>
      {/* <ReactHtmlParser
        prefixPath={props.prefixPath}
        htmlString={props.markdowntext}
        repo_id={props.parsedRepoId}
        isPublic={props.isPublic}
      /> */}
      <HtmlParser htmlString={props.markdowntext} prefixPath={props.prefixPath}/>
    </div>
  );
}
