import { hljs } from "@/lib/highlight";
import { createLine } from "@/utils/create-line/create-line";
import type { Post } from "@/utils/parse-post-from-api/parse-post-from-api";
import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { twMerge } from "tailwind-merge";
import { CopyButton } from "./copy-button";

type MarkdownProps = {
  content: Post["content"];
};

export function Markdown({ content }: Readonly<MarkdownProps>) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        pre: (props) => {
          const { node, ...rest } = props;
          return (
            <pre
              className="mx-auto w-[350px] max-w-full sm:w-[500px] md:w-screen"
              {...rest}
            />
          );
        },
        code: (props) => {
          const { node, children, ...rest } = props;

          const { value } = hljs.highlight(children as string, {
            language: "ts",
          });

          const lines = value.split("\n");

          if (lines.length === 1) {
            return (
              <code
                {...rest}
                className={twMerge(
                  rest.className,
                  "rounded-sm bg-amber-400 px-1 py-0.5 text-slate-800 before:hidden after:hidden",
                )}
                dangerouslySetInnerHTML={{ __html: children as string }}
              />
            );
          }

          const codeWithLinesNumbers = lines.map(createLine).join("\n");

          return (
            <div className="relative">
              <CopyButton text={children as string} />
              <code
                {...rest}
                dangerouslySetInnerHTML={{ __html: codeWithLinesNumbers }}
              />
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
