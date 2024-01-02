import { JSDOM } from "jsdom";
import React from "react";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";
import CodeBlock from "./CodeBlock";
import { classNameMap } from "@/utils/span_render";
import BackendImage from "./BackendImage";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdOutlineTipsAndUpdates, MdErrorOutline } from "react-icons/md";
import { AiFillInfoCircle, AiFillWarning, AiFillCode } from "react-icons/ai";
import Link from "next/link";
interface Attribute {
  name: string;
  value: string;
}

function attributesToProps(attributes: NamedNodeMap): {
  [key: string]: string;
} {
  const props: { [key: string]: string } = {};

  for (let i = 0; i < attributes.length; i++) {
    const attribute: Attribute = attributes[i] as Attribute;
    props[attribute.name] = attribute.value;
  }

  return props;
}
const parseHTMLString = (
  htmlString: string,
  prefixPath: string
): React.ReactNode => {
  const { window } = new JSDOM("");
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  var tag_id = 0;
  const processNode = (node: Node): React.ReactNode => {
    if (node instanceof window.Element) {
      const tagName = node.tagName.toUpperCase();
      const idAttribute = node.getAttribute("id");
      const randomKey = Math.random().toString(36).substring(7);
      if (tagName.startsWith("H") && !isNaN(parseInt(tagName[1], 10))) {
        const HeadingComponent =
          tagName.toLowerCase() as keyof JSX.IntrinsicElements;
        const level = parseInt(tagName.substring(1), 10);
        const className =
          level == 1
            ? "text-xl md:text-3xl font-black text-slate-900 tracking-tight text-center dark:text-slate-200 pb-3 md:pb-6 md:my-3"
            : level == 2
            ? "text-lg md:text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2 md:py-4"
            : level == 3
            ? "text-base md:text-xl font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5"
            : level == 4
            ? "text-base md:text-lg  font-bold	text-slate-900 tracking-tight  dark:text-slate-200  py-1.5"
            : level == 5
            ? "text-sm md:text-base font-bold text-slate-900 tracking-tight  dark:text-slate-200  py-1"
            : level == 6
            ? "text-sm md:text-base font-semibold text-slate-900 tracking-tight dark:text-slate-200 py-0.5"
            : "text-sm md:text-base font-semibold text-slate-900 tracking-tight dark:text-slate-200 py-0.5";

        return (
          <HeadingComponent
            key={randomKey}
            id={idAttribute || undefined}
            className={className}
          >
            {Array.from(node.childNodes).map(processNode)}
          </HeadingComponent>
        );
      } else if (
        node.classList.contains("math") &&
        node.classList.contains("display")
      ) {
        return (
          <div key={randomKey}>
            <MathDisplay>
              {Array.from(node.childNodes).map(processNode)}
            </MathDisplay>
          </div>
        );
      } else if (
        node.classList.contains("math") &&
        node.classList.contains("inline")
      ) {
        return (
          <span key={randomKey}>
            <MathInline>
              {Array.from(node.childNodes).map(processNode)}
            </MathInline>
          </span>
        );
      } else if (tagName === "CODEBLOCK") {
        tag_id += 1;
        return (
          <div key={randomKey}>
            <CodeBlock cur_id={tag_id} className={node.className}>
              {Array.from(node.childNodes).map(processNode)}
            </CodeBlock>
          </div>
        );
      } else if (tagName === "SPAN") {
        const classAttribute = node.getAttribute("class");
        if (classAttribute && classAttribute in classNameMap) {
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <span key={randomKey} className={classNameMap[classAttribute]}>
              {Array.from(node.childNodes).map(processNode)}
            </span>
          );
        } else {
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <span key={randomKey}>
              {Array.from(node.childNodes).map(processNode)}
            </span>
          );
        }
      } else if (tagName === "CODE") {
        const props = attributesToProps(node.attributes);
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <code
            className="text-blue-500 dark:text-blue-300 scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto"
            {...props}
          >
            <span
              key={randomKey}
              className="overflow-auto max-w-full whitespace-nowrap"
            >
              {Array.from(node.childNodes).map(processNode)}
            </span>
          </code>
        );
      } else if (tagName === "PRE") {
        const props = attributesToProps(node.attributes);
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <pre key={randomKey} {...props}>
            {Array.from(node.childNodes).map(processNode)}
          </pre>
        );
      } else if (tagName === "HR") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <div
            key={randomKey}
            className="border-t border-slate-300 dark:border-slate-600"
          />
        );
      } else if (tagName === "UL") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <ul
            key={randomKey}
            className="pl-6 pb-1 list-disc list-inside text-xs md:text-base text-slate-700 dark:text-slate-400"
          >
            {Array.from(node.childNodes).map(processNode)}
          </ul>
        );
      } else if (tagName === "LI") {
        const props = attributesToProps(node.attributes);
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <li key={randomKey} {...props}>
            {Array.from(node.childNodes).map(processNode)}
          </li>
        );
      } else if (tagName === "SUP") {
        const props = attributesToProps(node.attributes);
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <sup key={randomKey} {...props}>
            {Array.from(node.childNodes).map(processNode)}
          </sup>
        );
      }

      if (tagName === "DIV") {
        const classAttribute = node.getAttribute("class");
        const randomKey = Math.random().toString(36).substring(7);
        if (classAttribute === "footnotes") {
          return (
            <div key={randomKey} className="mx-1 my-4">
              {Array.from(node.childNodes).map(processNode)}
            </div>
          );
        } else if (classAttribute === "adm-title") {
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

          const parent = node.parentElement;
          const parentAttr =
            parent !== null && parent.getAttribute !== undefined;

          if (parentAttr) {
            const attrsArray = Array.from(parent.attributes);
            const classAttribute = attrsArray.find(
              (attr) => attr.name === "class"
            );

            if (
              classAttribute &&
              classAttribute.value === "admonition adm-note"
            ) {
              parentType = "note";
              bg1 = "bg-cyan-400/25 dark:bg-cyan-800/25";
              bg2 = "bg-cyan-500 dark:bg-cyan-900";
            } else if (
              classAttribute &&
              classAttribute.value === "admonition adm-warning"
            ) {
              parentType = "warning";
              bg1 = "bg-yellow-400/25 dark:bg-yellow-800/25";
              bg2 = "bg-yellow-500 dark:bg-yellow-900";
            } else if (
              classAttribute &&
              classAttribute.value === "admonition adm-info"
            ) {
              parentType = "info";
              bg1 = "bg-green-400/25 dark:bg-green-800/25";
              bg2 = "bg-green-500 dark:bg-green-900";
            } else if (
              classAttribute &&
              classAttribute.value === "admonition adm-tip"
            ) {
              parentType = "tip";
            } else if (
              classAttribute &&
              classAttribute.value === "admonition adm-error"
            ) {
              parentType = "error";
              bg1 = "bg-red-400/25 dark:bg-red-800/25";
              bg2 = "bg-red-500 dark:bg-red-900";
            }
          }

          const Icon = iconTypes[parentType];
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <div
              className={`relative py-2  rounded-t-md flex items-center justify-center space-x-4 ${bg1}`}
            >
              <div
                className={`relative ml-4 w-6 h-6 rounded-full text-white flex items-center justify-center ${bg2}`}
              >
                <Icon />
              </div>
              <p
                key={randomKey}
                className="flex-1 text-lg font-semibold text-slate-900 dark:text-slate-200 overflow-x-auto"
              >
                {Array.from(node.childNodes).map(processNode)}
              </p>
            </div>
          );
        } else if (classAttribute === "adm-body") {
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <div key={randomKey} className="p-4 overflow-x-auto">
              {Array.from(node.childNodes).map(processNode)}
            </div>
          );
        } else if (classAttribute && classAttribute.includes("admonition")) {
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <div
              key={randomKey}
              className="my-4 rounded-md bg-slate-100/50 dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-900/10"
            >
              {Array.from(node.childNodes).map(processNode)}
            </div>
          );
        } else {
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <div key={randomKey} className="text-xs md:text-base">
              {Array.from(node.childNodes).map(processNode)}
            </div>
          );
        }
      } else if (tagName === "P") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <div
            key={randomKey}
            className="my-2 break-all text-xs md:text-base text-slate-700 dark:text-slate-400"
          >
            {Array.from(node.childNodes).map(processNode)}
          </div>
        );
      } else if (tagName === "TABLE") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <div className="shadow-sm scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto">
            <table
              key={randomKey}
              className="border-collapse table-auto w-full text-sm border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800/25"
            >
              {Array.from(node.childNodes).map(processNode)}
            </table>
          </div>
        );
      } else if (tagName === "THEAD") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <thead key={randomKey} className="bg-slate-50 dark:bg-slate-800/75">
            {Array.from(node.childNodes).map(processNode)}
          </thead>
        );
      } else if (tagName === "TH") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <th
            key={randomKey}
            className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
          >
            {Array.from(node.childNodes).map(processNode)}
          </th>
        );
      } else if (tagName === "TR") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <tr key={randomKey} className="flex-1 justify-center items-center">
            {Array.from(node.childNodes).map(processNode)}
          </tr>
        );
      } else if (tagName === "TBODY") {
        const props = attributesToProps(node.attributes);
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <tbody key={randomKey} {...props}>
            {Array.from(node.childNodes).map(processNode)}
          </tbody>
        );
      } else if (tagName === "TD") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <td
            key={randomKey}
            className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"
          >
            {Array.from(node.childNodes).map(processNode)}
          </td>
        );
      } else if (tagName === "BLOCKQUOTE") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <blockquote
            key={randomKey}
            className="border-l-8 px-2 ring-1	ring-slate-200 dark:ring-slate-900/10 indent-4 md:indent-8  py-0.5 my-2 border-sky-500 bg-slate-100/50 dark:bg-slate-800/50 rounded-md  dark:shadow-sm"
          >
            {Array.from(node.childNodes).map(processNode)}
          </blockquote>
        );
      } else if (tagName === "OL") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <ol
            key={randomKey}
            className=" pb-2 list-decimal mt-1 text-base text-slate-800 dark:text-slate-300 py-2 pl-4"
          >
            {Array.from(node.childNodes).map(processNode)}
          </ol>
        );
      } else if (tagName === "IMG") {
        const srcAttribute = (node as Element).getAttribute("src");
        if (srcAttribute && srcAttribute.startsWith("http")) {
          return <img className="w-full my-4 rounded-md" src={srcAttribute} />;
        } else {
          return (
            <div key={randomKey}>
              <BackendImage path={prefixPath + "/" + srcAttribute} />
            </div>
          );
        }
      } else if (tagName === "DEL") {
        const randomKey = Math.random().toString(36).substring(7);
        return (
          <del key={randomKey}>
            {Array.from(node.childNodes).map(processNode)}
          </del>
        );
      } else if (tagName === "A") {
        const parent = node.parentElement;
        const parentAttr = parent !== null && parent.getAttribute !== undefined;
        if (parentAttr) {
          const tag = parent.tagName;
          const randomKey = Math.random().toString(36).substring(7);
          if (tag === "SUP") {
            return (
              <Link
                key={randomKey}
                className="text-sky-500 hover:text-sky-600 text-xs"
                href={node.getAttribute("href") || ""}
              >
                [{Array.from(node.childNodes).map(processNode)}]
              </Link>
            );
          }
        }
        const href = node.getAttribute("href");
        if (href && href.includes("footnote")) {
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <Link
              key={randomKey}
              className="text-sky-500 hover:text-sky-600"
              href={node.getAttribute("href") || ""}
            >
              {Array.from(node.childNodes).map(processNode)}
            </Link>
          );
        } else {
          const randomKey = Math.random().toString(36).substring(7);
          return (
            <Link
              key={randomKey}
              className="px-1 underline underline-offset-[0.22rem] text-sky-500 hover:text-sky-600"
              href={node.getAttribute("href") || ""}
            >
              {Array.from(node.childNodes).map(processNode)}
            </Link>
          );
        }
      }
    } else if (node instanceof window.Text) {
      // 处理文本节点
      return node.textContent;
    } else {
      return null; // 或者其他处理逻辑
    }
  };

  // Start processing from the body of the parsed HTML
  return Array.from(doc.body.childNodes).map(processNode);
};

interface HtmlParserProps {
  htmlString: string;
  prefixPath: string;
}

const HtmlParser: React.FC<HtmlParserProps> = ({ htmlString, prefixPath }) => {
  const parsedHTML = parseHTMLString(htmlString, prefixPath);
  // console.log("input is:", htmlString);
  // console.log("output is:", parsedHTML);
  return <div>{parsedHTML}</div>;
};

export default HtmlParser;
