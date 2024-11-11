import { hljs } from "@/lib/highlight";
import { createLine } from "@/utils/create-line/create-line";
import type { Post } from "@/utils/parse-post-from-api/parse-post-from-api";
import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

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
          let codeWithLinesNumbers = lines;

          if (codeWithLinesNumbers.length > 1) {
            codeWithLinesNumbers = codeWithLinesNumbers.map(createLine);
          }

          return (
            <code
              {...rest}
              dangerouslySetInnerHTML={{
                __html: codeWithLinesNumbers.join("\n"),
              }}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
