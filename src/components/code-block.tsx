"use client";

import { indentCode } from "@/utils/indent-code/indent-code";
import hljs from "highlight.js";
import { Copy } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

import "@/lib/highlight";

type CodeBlockProps = {
  code: string;
  toastTexts: {
    success: string;
    error: string;
  };
};

export function CodeBlock({ code, toastTexts }: Readonly<CodeBlockProps>) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef && codeRef.current) hljs.highlightBlock(codeRef.current);
  }, [code]);

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(toastTexts.success);
    } catch (error) {
      toast.error(toastTexts.error);
    }
  }

  return (
    <div className="not-prose relative w-[calc(100vw-100px)] sm:w-auto">
      <Button
        variant="link"
        className="absolute right-2 top-2 border bg-slate-900 hover:bg-slate-200 hover:bg-opacity-30"
        onClick={handleCopyCode}
      >
        <Copy className="w-4 text-slate-50" />
      </Button>
      <pre className="!bg-background !p-0">
        <code ref={codeRef} className="rounded-sm !bg-slate-900">
          {indentCode(code)}
        </code>
      </pre>
    </div>
  );
}
