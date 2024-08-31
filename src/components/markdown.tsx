"use client";

import type { Post } from "@/utils/parse-post-from-api/parse-post-from-api";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CodeBlock } from "./code-block";

type MarkdownProps = {
  content: Post["content"];
};

export function Markdown({ content }: Readonly<MarkdownProps>) {
  useEffect(() => {
    const preTags = document.querySelectorAll("pre");

    preTags.forEach((preTag) => {
      const codeTag = preTag.querySelector("code");

      if (!codeTag) return;

      const rootElement = document.createElement("div");
      preTag.replaceWith(rootElement);

      const root = createRoot(rootElement);
      root.render(<CodeBlock code={codeTag.textContent as string} />);
    });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
