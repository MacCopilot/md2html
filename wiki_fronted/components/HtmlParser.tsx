import { JSDOM } from "jsdom";
import React from "react";
import Heading from "./Heading";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";
import CodeBlock from "./CodeBlock";
import { classNameMap } from "@/utils/span_render";
import BackendImage from "./BackendImage";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import {
  MdDiversity1,
  MdOutlineContentCopy,
  MdOutlineTipsAndUpdates,
  MdErrorOutline,
} from "react-icons/md";
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
      if (tagName.startsWith("H") && !isNaN(parseInt(tagName[1], 10))) {
        return (
          <Heading tagName={tagName} idAttribute={idAttribute}>
            {Array.from(node.childNodes).map(processNode)}
          </Heading>
        );
      } else if (
        node.classList.contains("math") &&
        node.classList.contains("display")
      ) {
        return (
          <MathDisplay>
            {Array.from(node.childNodes).map(processNode)}
          </MathDisplay>
        );
      } else if (
        node.classList.contains("math") &&
        node.classList.contains("inline")
      ) {
        return (
          <MathInline>
            {Array.from(node.childNodes).map(processNode)}
          </MathInline>
        );
      } else if (tagName === "CODEBLOCK") {
        tag_id += 1;
        return (
          <CodeBlock cur_id={tag_id} className={node.className}>
            {Array.from(node.childNodes).map(processNode)}
          </CodeBlock>
        );
      } else if (tagName === "SPAN") {
        const classAttribute = node.getAttribute("class");
        console.log("classAttribute is:", classAttribute);
        if (classAttribute && classAttribute in classNameMap) {
          console.log("class is:", classNameMap[classAttribute]);
          return (
            <span className={classNameMap[classAttribute]}>
              {Array.from(node.childNodes).map(processNode)}
            </span>
          );
        } else {
          return <span>{Array.from(node.childNodes).map(processNode)}</span>;
        }
      } else if (tagName === "CODE") {
        const props = attributesToProps(node.attributes);
        return (
          <code
            className="text-blue-500 dark:text-blue-300 scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto"
            {...props}
          >
            <span className="overflow-auto inline-block max-w-full whitespace-nowrap">
              {Array.from(node.childNodes).map(processNode)}
            </span>
          </code>
        );
      } else if (tagName === "PRE") {
        const props = attributesToProps(node.attributes);
        return (
          <pre {...props}>{Array.from(node.childNodes).map(processNode)}</pre>
        );
      } else if (tagName === "HR") {
        return (
          <div className="border-t border-slate-300 dark:border-slate-600" />
        );
      } else if (tagName === "UL") {
        return (
          <ul className="pl-6 pb-1 list-disc list-inside text-xs md:text-base text-slate-700 dark:text-slate-400">
            {Array.from(node.childNodes).map(processNode)}
          </ul>
        );
      } else if (tagName === "LI") {
        const props = attributesToProps(node.attributes);
        return (
          <li {...props}>{Array.from(node.childNodes).map(processNode)}</li>
        );
      } else if (tagName === "SUP") {
        const props = attributesToProps(node.attributes);
        return (
          <sup {...props}>{Array.from(node.childNodes).map(processNode)}</sup>
        );
      }
      // else if (tagName === "DIV") {
      //   if (node.className === "footnotes") {
      //     return (
      //       <div className="mx-1 my-4">
      //         {Array.from(node.childNodes).map(processNode)}
      //       </div>
      //     );
      //   } else if (node.className === "adm-title") {
      //     return <>unimpl</>;
      //   } else if (node.className === "adm-body") {
      //     return <>unimpl</>;
      //   }
      //   return (
      //     <div key={Math.random()} className="text-xs md:text-base">
      //       {Array.from(node.childNodes).map(processNode)}
      //     </div>
      //   );
      // }

      if (tagName === "DIV") {
        const classAttribute = node.getAttribute("class");

        if (classAttribute === "footnotes") {
          return (
            <div className="mx-1 my-4">
              {Array.from(node.childNodes).map(processNode)}
            </div>
          );
        }

        if (classAttribute === "adm-title") {
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
                {Array.from(node.childNodes).map(processNode)}
              </p>
            </div>
          );
        }

        if (classAttribute === "adm-body") {
          return (
            <div className="p-4 overflow-x-auto">
              {Array.from(node.childNodes).map(processNode)}
            </div>
          );
        }

        if (classAttribute && classAttribute.includes("admonition")) {
          return (
            <div className="my-4 rounded-md bg-slate-100/50 dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-900/10">
              {Array.from(node.childNodes).map(processNode)}
            </div>
          );
        }

        return (
          <div className="text-xs md:text-base">
            {Array.from(node.childNodes).map(processNode)}
          </div>
        );
      } else if (tagName === "P") {
        return (
          <div className="my-2 break-all text-xs md:text-base text-slate-700 dark:text-slate-400">
            {Array.from(node.childNodes).map(processNode)}
          </div>
        );
      } else if (tagName === "TABLE") {
        return (
          <div className="shadow-sm scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto">
            <table className="border-collapse table-auto w-full text-sm border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800/25">
              {Array.from(node.childNodes).map(processNode)}
            </table>
          </div>
        );
      } else if (tagName === "THREAD") {
        return (
          <thead className="bg-slate-50 dark:bg-slate-800/75">
            {Array.from(node.childNodes).map(processNode)}
          </thead>
        );
      } else if (tagName === "TH") {
        return (
          <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            {Array.from(node.childNodes).map(processNode)}
          </th>
        );
      } else if (tagName === "TR") {
        return (
          <tr className="flex-1 justify-center items-center">
            {Array.from(node.childNodes).map(processNode)}
          </tr>
        );
      } else if (tagName === "TBODY") {
        const props = attributesToProps(node.attributes);
        return (
          <tbody {...props}>
            {Array.from(node.childNodes).map(processNode)}
          </tbody>
        );
      } else if (tagName === "TD") {
        return (
          <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
            {Array.from(node.childNodes).map(processNode)}
          </td>
        );
      } else if (tagName === "BLOCKQUOTE") {
        return (
          <blockquote className="border-l-8 px-2 ring-1	ring-slate-200 dark:ring-slate-900/10 indent-4 md:indent-8  py-0.5 my-2 border-sky-500 bg-slate-100/50 dark:bg-slate-800/50 rounded-md  dark:shadow-sm">
            {Array.from(node.childNodes).map(processNode)}
          </blockquote>
        );
      } else if (tagName === "OL") {
        return (
          <ol className=" pb-2 list-decimal mt-1 text-base text-slate-800 dark:text-slate-300 py-2 pl-4">
            {Array.from(node.childNodes).map(processNode)}
          </ol>
        );
      } else if (tagName === "IMG") {
        const srcAttribute = (node as Element).getAttribute("src");
        if (srcAttribute && srcAttribute.startsWith("http")) {
          return <img className="w-full my-4 rounded-md" src={srcAttribute} />;
        } else {
          return <BackendImage path={prefixPath + "/" + srcAttribute} />;
        }
      } else if (tagName === "DEL") {
        return <del>{Array.from(node.childNodes).map(processNode)}</del>;
      } else if (tagName === "A") {
        const parent = node.parentElement;
        const parentAttr = parent !== null && parent.getAttribute !== undefined;
        if (parentAttr) {
          const tag = parent.tagName;
          if (tag === "SUP") {
            return (
              <Link
                className="text-sky-500 hover:text-sky-600 text-xs"
                href={node.getAttribute("href") || ""}
              >
                {Array.from(node.childNodes).map(processNode)}
              </Link>
            );
          }
        }
        const href = node.getAttribute("href");
        if (href && href.includes("footnote")) {
          return (
            <Link
              className="text-sky-500 hover:text-sky-600"
              href={node.getAttribute("href") || ""}
            >
              {Array.from(node.childNodes).map(processNode)}
            </Link>
          );
        }

        return (
          <Link
            className="px-1 underline underline-offset-2 text-sky-500 hover:text-sky-600"
            href={node.getAttribute("href") || ""}
          >
            {Array.from(node.childNodes).map(processNode)}
          </Link>
        );
      }
    }

    // Default case: return the node as-is
    return node.textContent;
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
