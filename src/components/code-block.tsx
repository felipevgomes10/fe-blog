"use client";

import { trimCode } from "@/utils/trim-code/trim-code";
import hljs from "highlight.js";
import { Copy } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

import "@/lib/highlight";

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: Readonly<CodeBlockProps>) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef && codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy code to clipboard");
    }
  }

  return (
    <div className="relative">
      <Button
        variant="link"
        className="absolute top-2 right-2 hover:bg-slate-200 hover:bg-opacity-30"
        onClick={handleCopyCode}
      >
        <Copy className="text-slate-50 w-4" />
      </Button>
      <pre className="!bg-background !p-0">
        <code ref={codeRef} className="rounded-sm">
          {trimCode(code)}
        </code>
      </pre>
    </div>
  );
}
