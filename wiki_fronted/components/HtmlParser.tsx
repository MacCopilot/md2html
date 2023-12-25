import { JSDOM } from "jsdom";
import React from "react";
import Heading from "./Heading";
import MathDisplay from "./MathDisplay"
const parseHTMLString = (htmlString: string): React.ReactNode => {
  const { window } = new JSDOM("");
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

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
        console.log("mydebug=====")
        // Use the MathDisplay component for "math display" elements
        return (
          <MathDisplay key={Math.random()}>
            {Array.from(node.childNodes).map(processNode)}
          </MathDisplay>
        );
      } else if (tagName === "DIV") {
        return (
          <div key={Math.random()} className="text-xs md:text-base">
            {Array.from(node.childNodes).map(processNode)}
          </div>
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
}

const HtmlParser: React.FC<HtmlParserProps> = ({ htmlString }) => {
  const parsedHTML = parseHTMLString(htmlString);
  console.log("parserHtml is:", parsedHTML);
  return <div>{parsedHTML}</div>;
};

export default HtmlParser;
