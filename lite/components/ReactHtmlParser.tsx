"use client";
import {
  domToReact,
  attributesToProps,
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import Link from "next/link";
import parse from "html-react-parser";
import { mathjax_config } from "@/utils/mathjax_config";
import { MathJax } from "better-react-mathjax";
import { MathJaxContext } from "better-react-mathjax";
import MermaidCode from "@/components/MermaidCode";
import {
  MdDiversity1,
  MdOutlineContentCopy,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";
import { AiFillInfoCircle, AiFillWarning, AiFillCode } from "react-icons/ai";
import { isContains, generateRandomId, copy2ClipBoard } from "@/utils/util";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { classNameMap } from "@/utils/span_render";
type HTMLParserProps = {
  htmlString: string;
  repo_id: number;
  prefixPath: string;
  isPublic:boolean;
};

export default function ReactHtmlParser({
  htmlString,
  repo_id,
  prefixPath,
  isPublic,
}: HTMLParserProps) {
  var id = 0;
  const html_parser_options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "h1") {
        const props = attributesToProps(domNode.attribs);
        return (
          <h1
            id={props.id}
            className="text-xl md:text-3xl font-black text-slate-900 tracking-tight text-center dark:text-slate-200 pb-3 md:pb-6 md:my-3"
          >
            {domToReact(domNode.children, html_parser_options)}
          </h1>
        );
      }
      if (domNode instanceof Element && domNode.name === "h2") {
        const props = attributesToProps(domNode.attribs);
        return (
          <h2
            id={props.id}
            className="text-lg md:text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2 md:py-4"
          >
            {domToReact(domNode.children, html_parser_options)}
          </h2>
        );
      }
      if (domNode instanceof Element && domNode.name === "h3") {
        const props = attributesToProps(domNode.attribs);
        return (
          <h3
            id={props.id}
            className="text-base md:text-xl font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5"
          >
            {domToReact(domNode.children, html_parser_options)}
          </h3>
        );
      }
      if (domNode instanceof Element && domNode.name === "h4") {
        const props = attributesToProps(domNode.attribs);
        return (
          <h4
            id={props.id}
            className="text-base md:text-lg  font-bold	text-slate-900 tracking-tight  dark:text-slate-200  py-1.5"
          >
            {domToReact(domNode.children, html_parser_options)}
          </h4>
        );
      }
      if (domNode instanceof Element && domNode.name === "h5") {
        const props = attributesToProps(domNode.attribs);
        return (
          <h5
            id={props.id}
            className="text-sm md:text-base font-bold text-slate-900 tracking-tight  dark:text-slate-200  py-1"
          >
            {domToReact(domNode.children, html_parser_options)}
          </h5>
        );
      }
      if (domNode instanceof Element && domNode.name === "h6") {
        const props = attributesToProps(domNode.attribs);
        return (
          <h6
            id={props.id}
            className="text-sm md:text-base font-semibold text-slate-900 tracking-tight dark:text-slate-200 py-0.5"
          >
            {domToReact(domNode.children, html_parser_options)}
          </h6>
        );
      }
      if (
        domNode instanceof Element &&
        domNode.attribs.class === "math display"
      ) {
        return (
          <MathJaxContext version={3} config={mathjax_config}>
            <div className="scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto overflow-y-hidden">
              <MathJax>
                {" "}
                {domToReact(domNode.children, html_parser_options)}{" "}
              </MathJax>
            </div>
          </MathJaxContext>
        );
      }
      if (
        domNode instanceof Element &&
        domNode.attribs.class === "math inline"
      ) {
        return (
          <MathJaxContext version={3} config={mathjax_config}>
            <span className="scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto overflow-y-hidden">
              <MathJax inline>
                {" "}
                {domToReact(domNode.children, html_parser_options)}{" "}
              </MathJax>
            </span>
          </MathJaxContext>
        );
      }

      if (domNode instanceof Element && domNode.name === "codeblock") {
        let cur_id = id;
        id += 1;
        return (
          <div className="relative z-10 my-4 col-span-3 font-base rounded-md bg-slate-100/50 dark:bg-slate-800/50  ring-1	ring-slate-200 dark:ring-slate-900/10">
            <div className="relative py-1 md:py-2 space-x-4 rounded-t-md flex items-center justify-center  text-slate-400 text-xs md:text-sm leading-6 bg-slate-200/50 dark:bg-slate-800/50">
              <div className="relative ml-2 md:ml-4 w-8 h-8 rounded-full text-white flex items-center justify-center">
                <AiFillCode className="w-5 h-5 md:w-6 md:h-6 text-slate-500 dark:text-slate-200" />
              </div>
              <p className="flex-1 text-base md:text-lg font-semibold text-slate-900 dark:text-slate-200">
                {domNode.attribs.class}
              </p>
              <div className="absolute top-2 right-0 md:h-8 flex items-center md:pr-4 pr-2">
                <div className="relative flex">
                  <MdOutlineContentCopy
                    className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-slate-500 dark:text-slate-300"
                    onClick={() => {
                      console.log("copy to clipboard")
                      copy2ClipBoard("code_id_" + cur_id);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="highlight p-2 md:p-4 text-xs md:text-sm text-slate-800 dark:text-slate-200
          scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-auto max-h-[42rem]
        "
            >
              <pre id={"code_id_" + cur_id}>
                <code>
                  {domNode.attribs.class === "mermaid" ? (
                    <MermaidCode
                      graphDefinition={String(
                        domToReact(domNode.children, html_parser_options)
                      )}
                    />
                  ) : (
                    <>{domToReact(domNode.children, html_parser_options)}</>
                  )}
                </code>
              </pre>
            </div>
          </div>
        );
      }
      if (
        domNode instanceof Element &&
        domNode.name === "span" &&
        domNode.attribs.class in classNameMap
      ) {
        return (
          <span className={classNameMap[domNode.attribs.class]}>
            {domToReact(domNode.children, html_parser_options)}
          </span>
        );
      }
      if (domNode instanceof Element && domNode.name === "code") {
        const props = attributesToProps(domNode.attribs);
        return (
          <code className="text-blue-500 dark:text-blue-300 scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto" {...props}>
            <span className="overflow-auto inline-block max-w-full whitespace-nowrap ">`{domToReact(domNode.children, html_parser_options)}`</span>
          </code>
        );
      }
      if (domNode instanceof Element && domNode.name === "pre") {
        const props = attributesToProps(domNode.attribs);
        return (
          <pre {...props}>
            {domToReact(domNode.children, html_parser_options)}
          </pre>
        );
      }

      if (domNode instanceof Element && domNode.name === "hr") {
        return (
          <div className="border-t border-slate-300 dark:border-slate-600" />
        );
      }

      if (domNode instanceof Element && domNode.name === "ul") {
        return (
          <ul className="pl-6 pb-1 list-disc list-inside text-xs md:text-base text-slate-700 dark:text-slate-400">
            {domToReact(domNode.children, html_parser_options)}
          </ul>
        );
      }
      if (domNode instanceof Element && domNode.name === "li") {
        const props = attributesToProps(domNode.attribs);
        return (
          <li {...props}>
            {domToReact(domNode.children, html_parser_options)}
          </li>
        );
      }

      if (domNode instanceof Element && domNode.name === "sup") {
        const props = attributesToProps(domNode.attribs);
        return (
          <sup {...props}>
            {domToReact(domNode.children, html_parser_options)}
          </sup>
        );
      }

      if (domNode instanceof Element && domNode.name === "div") {
        if (domNode.attribs.class === "footnotes") {
          return (
            <div className="mx-1 my-4">
              {domToReact(domNode.children, html_parser_options)}
            </div>
          );
        }
        if (domNode.attribs.class === "adm-title") {
          type ParentType = "note" | "warning" | "info" | "tip" | "error";
          let parentType: ParentType = "note"; // or "warning", "info", "tip", "error"

          const iconTypes = {
            note: BsFillBookmarkCheckFill,
            warning: AiFillWarning,
            info: AiFillInfoCircle,
            tip: MdOutlineTipsAndUpdates,
            error: MdErrorOutline,
          };
          let bg1 = "bg-cyan-400/25 dark:bg-cyan-800/25";
          let bg2 = "bg-cyan-500 dark:bg-cyan-900";
          // 访问父元素的属性
          const parent = domNode.parent;
          //@ts-ignore
          const parentAttr = parent != undefined && parent.attribs != undefined;
          if (parentAttr) {
            //@ts-ignore
            const attrs = parent.attribs;
            const att = attrs["class"];
            if (att === "admonition adm-note") {
              parentType = "note";
              bg1 = "bg-cyan-400/25 dark:bg-cyan-800/25";
              bg2 = "bg-cyan-500 dark:bg-cyan-900";
            } else if (att === "admonition adm-warning") {
              parentType = "warning";
              bg1 = "bg-yellow-400/25 dark:bg-yellow-800/25";
              bg2 = "bg-yellow-500 dark:bg-yellow-900";
            } else if (att === "admonition adm-info") {
              parentType = "info";
              bg1 = "bg-green-400/25 dark:bg-green-800/25";
              bg2 = "bg-green-500 dark:bg-green-900";
            } else if (att === "admonition adm-tip") {
              parentType = "tip";
            } else if (att === "admonition adm-error") {
              parentType = "error";
              bg1 = "bg-red-400/25 dark:bg-red-800/25";
              bg2 = "bg-red-500 dark:bg-red-900";
            }
          }
          const Icon = iconTypes[parentType];
          return (
            <div
              className={`relative py-2  rounded-t-md flex items-center justify-center space-x-4 ${bg1}`}
            >
              <div
                className={`relative ml-4 w-6 h-6 rounded-full text-white flex items-center justify-center ${bg2}`}
              >
                <Icon />
              </div>
              <p className="flex-1 text-lg font-semibold text-slate-900 dark:text-slate-200 overflow-x-auto">
                {domToReact(domNode.children, html_parser_options)}
              </p>
            </div>
          );
        }
        if (domNode.attribs.class == "adm-body") {
          return (
            <div className="p-4 overflow-x-auto">
              {domToReact(domNode.children, html_parser_options)}
            </div>
          );
        }
        if (isContains(domNode.attribs.class, "admonition")) {
          return (
            <div className="my-4 rounded-md bg-slate-100/50 dark:bg-slate-800/50  ring-1	ring-slate-200 dark:ring-slate-900/10">
              {domToReact(domNode.children, html_parser_options)}
            </div>
          );
        }
        return (
          <div className=" text-xs md:text-base">
            {domToReact(domNode.children, html_parser_options)}
          </div>
        );
      }

      if (domNode instanceof Element && domNode.name === "p") {
        return (
          <div className="my-2 break-all text-xs md:text-base text-slate-700 dark:text-slate-400">
            {domToReact(domNode.children, html_parser_options)}
          </div>
        );
      }
      if (domNode instanceof Element && domNode.name === "table") {
        return (
          <div className="shadow-sm scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto">
            <table className="border-collapse table-auto w-full text-sm border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800/25">
              {domToReact(domNode.children, html_parser_options)}
            </table>
          </div>
        );
      }

      if (domNode instanceof Element && domNode.name === "thead") {
        return (
          <thead className="bg-slate-50 dark:bg-slate-800/75">
            {domToReact(domNode.children, html_parser_options)}
          </thead>
        );
      }
      if (domNode instanceof Element && domNode.name === "th") {
        return (
          <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            {domToReact(domNode.children, html_parser_options)}
          </th>
        );
      }
      if (domNode instanceof Element && domNode.name === "tr") {
        return (
          <tr className="flex-1 justify-center items-center">
            {domToReact(domNode.children, html_parser_options)}
          </tr>
        );
      }
      if (domNode instanceof Element && domNode.name === "tbody") {
        const props = attributesToProps(domNode.attribs);
        return (
          <tbody {...props}>
            {domToReact(domNode.children, html_parser_options)}
          </tbody>
        );
      }
      if (domNode instanceof Element && domNode.name === "td") {
        return (
          <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
            {domToReact(domNode.children, html_parser_options)}
          </td>
        );
      }
      if (domNode instanceof Element && domNode.name === "blockquote") {
        return (
          <blockquote className="border-l-8 px-2 ring-1	ring-slate-200 dark:ring-slate-900/10 indent-4 md:indent-8  py-0.5 my-2 border-sky-500 bg-slate-100/50 dark:bg-slate-800/50 rounded-md  dark:shadow-sm">
            {domToReact(domNode.children, html_parser_options)}
          </blockquote>
        );
      }
      if (domNode instanceof Element && domNode.name === "ol") {
        return (
          <ol className=" pb-2 list-decimal mt-1 text-base text-slate-800 dark:text-slate-300 py-2 pl-4">
            {domToReact(domNode.children, html_parser_options)}
          </ol>
        );
      }
      if (domNode instanceof Element && domNode.name === "img") {
        if (domNode.attribs.src.startsWith("http")) {
          return (
            <img className="w-full my-4 rounded-md" src={domNode.attribs.src} />
          );
        } else {
          return <img className="w-full my-4 rounded-md" src={"http://localhost:8080/"+prefixPath + "/" + domNode.attribs.src} />
        }
      }
      if (domNode instanceof Element && domNode.name === "del") {
        return <del>{domToReact(domNode.children, html_parser_options)}</del>;
      }
      if (domNode instanceof Element && domNode.name === "a") {
        const parent = domNode.parent;
        //@ts-ignore
        const parentAttr = parent != undefined && parent.attribs != undefined;
        if (parentAttr) {
          //@ts-ignore
          const tag = parent.name;
          if (tag == "sup") {
            return (
              <Link
                className="text-sky-500 hover:text-sky-600 text-xs"
                href={
                  domNode.attribs.href == undefined ? "" : domNode.attribs.href
                }
              >
                [{domToReact(domNode.children, html_parser_options)}]
              </Link>
            );
          }
        }
        if (isContains(domNode.attribs.href, "footnote")) {
          return (
            <Link
              className=" text-sky-500 hover:text-sky-600"
              href={
                domNode.attribs.href == undefined ? "" : domNode.attribs.href
              }
            >
              {domToReact(domNode.children, html_parser_options)}
            </Link>
          );
        }

        return (
          <Link
            className="px-1 underline underline-offset-2 text-sky-500 hover:text-sky-600"
            href={domNode.attribs.href == undefined ? "" : domNode.attribs.href}
          >
            {domToReact(domNode.children, html_parser_options)}
          </Link>
        );
      }
    },
  };

  return <> {parse(htmlString, html_parser_options)}</>;
}
