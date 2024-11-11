"use client";

import type { Post } from "@/utils/parse-post-from-api/parse-post-from-api";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./code-block";

import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type MarkdownProps = {
  content: Post["content"];
};

export function Markdown({ content }: Readonly<MarkdownProps>) {
  const t = useTranslations("toast");

  const toastTexts = useMemo(
    () => ({
      success: t("success"),
      error: t("error"),
    }),
    [t],
  );

  useEffect(() => {
    const preTags = document.querySelectorAll("pre");

    preTags.forEach((preTag) => {
      const codeTag = preTag.querySelector("code");

      if (!codeTag) return;

      const rootElement = document.createElement("div");
      preTag.replaceWith(rootElement);

      const root = createRoot(rootElement);
      root.render(
        <CodeBlock
          code={codeTag.textContent as string}
          toastTexts={toastTexts}
        />,
      );
    });
  }, [toastTexts]);

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
      {content}
    </ReactMarkdown>
  );
}
