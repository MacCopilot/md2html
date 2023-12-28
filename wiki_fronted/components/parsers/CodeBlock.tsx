"use client";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiFillCode } from "react-icons/ai";
import { copy2ClipBoard } from "@/utils/util";
import MermaidCode from "./MermaidCode";
interface CodeBlockProps {
  cur_id: number;
  className: String;
  children: React.ReactNode;
}
export default function CodeBlock(props: CodeBlockProps) {
  return (
    <div className="relative z-10 my-4 col-span-3 font-base rounded-md bg-slate-100/50 dark:bg-slate-800/50  ring-1	ring-slate-200 dark:ring-slate-900/10">
      <div className="relative py-1 md:py-2 space-x-4 rounded-t-md flex items-center justify-center  text-slate-400 text-xs md:text-sm leading-6 bg-slate-200/50 dark:bg-slate-800/50">
        <div className="relative ml-2 md:ml-4 w-8 h-8 rounded-full text-white flex items-center justify-center">
          <AiFillCode className="w-5 h-5 md:w-6 md:h-6 text-slate-500 dark:text-slate-200" />
        </div>
        <p className="flex-1 text-base md:text-lg font-semibold text-slate-900 dark:text-slate-200">
          {props.className}
        </p>
        <div className="absolute top-2 right-0 md:h-8 flex items-center md:pr-4 pr-2">
          <div className="relative flex">
            <MdOutlineContentCopy
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-slate-500 dark:text-slate-300"
              onClick={() => {
                console.log("copy to clipboard");
                copy2ClipBoard("code_id_" + props.cur_id);
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
        <pre id={"code_id_" + props.cur_id}>
          <code>
            {props.className === "mermaid" ? (
              <MermaidCode graphDefinition={String(props.children)} />
            ) : (
              <>{props.children}</>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
