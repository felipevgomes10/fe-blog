import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";

hljs.configure({
  languages: ["typescript", "javascript", "html", "css"],
});

export { hljs };
