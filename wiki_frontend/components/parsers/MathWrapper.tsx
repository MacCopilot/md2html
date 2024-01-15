"use client"
import { mathjax_config } from "@/utils/mathjax_config";

import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function MathWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MathJaxContext version={3} config={mathjax_config}>
      <MathJax>{children}</MathJax>
    </MathJaxContext>
  );
}
