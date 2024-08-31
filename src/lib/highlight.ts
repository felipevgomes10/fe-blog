import { createLine } from "@/utils/create-line/create-line";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";

hljs.addPlugin({
  "after:highlightElement": ({ el: codeBlock, result: { value } }) => {
    const codeWithLines = value
      .split("\n")
      .map((line, index) => createLine(line, index))
      .join("\n");

    codeBlock.innerHTML = codeWithLines;
  },
});

hljs.configure({
  languages: ["typescript", "javascript", "html", "css"],
});
