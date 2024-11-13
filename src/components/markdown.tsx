import { hljs } from "@/lib/highlight";
import { createLine } from "@/utils/create-line/create-line";
import type { Post } from "@/utils/parse-post-from-api/parse-post-from-api";
import ReactMarkdown from "react-markdown";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { CopyButton } from "./copy-button";

import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type MarkdownProps = {
  content: Post["content"];
};

const preTagSchema = z.object({
  props: z.object({
    children: z.string(),
  }),
});

export function Markdown({ content }: Readonly<MarkdownProps>) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        pre: (props) => {
          const { node, children, ...rest } = props;
          const { data, success } = preTagSchema.safeParse(children);

          let text = "";

          if (success) text = data.props.children;

          return (
            <div className="relative">
              <CopyButton text={text} />
              <pre
                className="mx-auto w-[350px] max-w-full sm:w-[500px] md:w-screen"
                {...rest}
              >
                {children}
              </pre>
            </div>
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
            <code
              {...rest}
              dangerouslySetInnerHTML={{ __html: codeWithLinesNumbers }}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
