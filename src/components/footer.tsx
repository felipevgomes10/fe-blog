import { Linkedin } from "lucide-react";
import { GithubIcon } from "./github-icon";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://github.com/felipevgomes10"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/felipe-gomes-4b70221a8/"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <Linkedin className="stroke-accent-foreground" size={20} />
        </a>
      </div>
      <span className="text-xs text-secondary-foreground opacity-50">
        Felipe Gomes
      </span>
    </footer>
  );
}
