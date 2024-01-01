"use client";
import { mathjax_config } from "@/utils/mathjax_config";

import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface MathInlineProps {
  children: React.ReactNode;
}

const MathInline: React.FC<MathInlineProps> = ({ children }) => (
  <MathJaxContext version={3} config={mathjax_config}>
    <span className="scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto overflow-y-hidden">
      <MathJax inline>{children}</MathJax>
    </span>
  </MathJaxContext>
);

export default MathInline;
