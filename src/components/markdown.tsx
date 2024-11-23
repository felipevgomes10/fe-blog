import type { MappedPost } from "@/http/mappers/post-mapper/post-mapper";
import { hljs } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { createLine } from "@/utils/create-line/create-line";
import { ExternalLink } from "lucide-react";
import ReactMarkdown, { type ExtraProps } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { z } from "zod";
import { CopyButton } from "./copy-button";

type MarkdownProps = {
  content: MappedPost["content"];
};

type HeadingProps = JSX.IntrinsicElements["h1"] &
  ExtraProps & {
    children: string;
  };

type BookmarkableHeadings = Record<
  (typeof headings)[number],
  (props: HeadingProps) => JSX.Element
>;

const preTagSchema = z.object({
  props: z.object({
    children: z.string(),
  }),
});

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const bookmarkableHeadings = headings.reduce((acc, heading) => {
  acc[heading] = (props: HeadingProps) => {
    const { node, children, ...rest } = props;
    const id = (children as string).toLowerCase().replace(/\s/g, "-");

    const Heading = heading;

    return (
      <Heading {...rest} id={id}>
        {children}
      </Heading>
    );
  };

  return acc;
}, {} as BookmarkableHeadings);

export function Markdown({ content }: Readonly<MarkdownProps>) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        ...(bookmarkableHeadings as any),
        a: (props) => {
          const { node, children, className, ...rest } = props;

          return (
            <a
              {...rest}
              target="_blank"
              className={cn(
                className,
                "inline-flex items-center gap-1 p-0 leading-tight text-accent-foreground no-underline underline-offset-1 hover:underline",
              )}
            >
              {children}
              <ExternalLink size={12} />
            </a>
          );
        },
        pre: (props) => {
          const { node, children, ...rest } = props;
          const { data, success } = preTagSchema.safeParse(children);

          let text = "";

          if (success) text = data.props.children;

          return (
            <div className="relative mx-auto w-[290px] max-w-full sm:w-[500px] md:w-screen">
              <CopyButton text={text} />
              <pre {...rest}>{children}</pre>
            </div>
          );
        },
        code: (props) => {
          const { node, children, className, ...rest } = props;

          const { value } = hljs.highlight(children as string, {
            language: "ts",
          });

          const lines = value.split("\n");

          if (lines.length === 1) {
            return (
              <code
                {...rest}
                className={cn(
                  className,
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
