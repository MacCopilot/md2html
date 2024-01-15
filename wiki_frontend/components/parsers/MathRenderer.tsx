"use client"
import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathRendererProps {
  expression: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ expression }) => {
  const mathRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mathRef.current) {
      katex.render(expression, mathRef.current, {
        throwOnError: false,
      });
    }
  }, [expression]);

  return <div ref={mathRef} />;
};

export default MathRenderer;
