"use client";
import parse from "html-react-parser";

import React, { useState, useEffect } from "react";


import {
  domToReact,
  attributesToProps,
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import ContentSideBar from "./sidebars/ContentSideBar";
interface SideBarTableProps {
    sectionIds: string[];
    markdownlist: string;
}

export default function SideBarTable(props:SideBarTableProps){
 const [activeSectionId, setActiveSectionId] = useState("");
  function get_act() {
    return activeSectionId;
  }
  const handleClick = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    var href = e.target.getAttribute("href");
    const escapedSelector = href.replace(/#(\d)/, "#\\3$1 ");
    const section1 = document.querySelector(escapedSelector);
    const navHeight = 20;
    window.scrollTo({
      top: section1.offsetTop - navHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      const visibleSectionId = props.sectionIds.find((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top >= 20 && rect.top <= 100;
        }
        return false;
      });
      if (visibleSectionId != undefined) {
        setActiveSectionId(visibleSectionId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.sectionIds]);
  var html_parser_options_list: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "ul") {
        // 访问父元素的属性
        const parent = domNode.parent;
        //@ts-ignore
        const parentAttr = parent != undefined && parent.attribs != undefined;
        if (parentAttr) {
          return (
            <ul className="text-slate-700 text-sm leading-6	">
              {domToReact(domNode.children, html_parser_options_list)}
            </ul>
          );
        } else {
          return (
            <ul className="text-slate-700 leading-0 text-base">
              {domToReact(domNode.children, html_parser_options_list)}
            </ul>
          );
        }
      }
      if (domNode instanceof Element && domNode.name === "li") {
        return (
          <li className="ml-4">
            {domToReact(domNode.children, html_parser_options_list)}
          </li>
        );
      } else if (domNode instanceof Element && domNode.name === "a") {
        const props = attributesToProps(domNode.attribs);
        // 访问父元素的属性
        const parent = domNode.parent;
        if (!parent || !parent.parent || !parent.parent.parent) {
          return (
            <a
              {...props}
              onClick={handleClick}
              className={`group flex items-start py-1 hover:text-sky-500  dark:hover:text-sky-500 ${
                get_act() === props.href.substring(1)
                  ? "dark:text-sky-500 text-sky-500"
                  : "dark:text-slate-400"
              }`}
            >
              {domToReact(domNode.children, html_parser_options_list)}
            </a>
          );
        }
        return (
          <a
            {...props}
            onClick={handleClick}
            className={`group flex items-start py-1 hover:text-sky-500  dark:hover:text-sky-500 ${
              get_act() === props.href.substring(1)
                ? "dark:text-sky-500 text-sky-500"
                : "dark:text-slate-400"
            }`}
          >
            <svg
              width="3"
              height="24"
              viewBox="0 -9 3 24"
              className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
            >
              <path
                d="M0 0L3 3L0 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>
            {domToReact(domNode.children, html_parser_options_list)}
          </a>
        );
      }
    },
  };

    return  <ContentSideBar>
        {parse(props.markdownlist, html_parser_options_list)}
      </ContentSideBar> 
}