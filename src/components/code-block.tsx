"use client";

import hljs from "highlight.js";
import { useEffect, useRef } from "react";

import "@/lib/highlight";

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef && codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  return (
    <pre className="!bg-background !p-0">
      <code ref={codeRef} className="rounded-sm">
        {code}
      </code>
    </pre>
  );
}
