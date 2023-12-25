"use client"
import { mathjax_config } from "@/utils/mathjax_config";

import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface MathDisplayProps {
  children: React.ReactNode;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ children }) => (
  <MathJaxContext version={3} config={mathjax_config}>
    <div className="scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-x-auto overflow-y-hidden">
      <MathJax>{children}</MathJax>
    </div>
  </MathJaxContext>
);

export default MathDisplay;

