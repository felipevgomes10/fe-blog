"use client";

import { usePathname } from "@/i18n/navigation";
import { Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { GithubIcon } from "./github-icon";
import { ViewTransitionLink } from "./view-transition-link";

export function Footer() {
  const t = useTranslations("about_me");
  const pathname = usePathname();

  return (
    <footer className="flex flex-col items-center justify-center gap-3 pb-4">
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
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-secondary-foreground opacity-50">
          Felipe Gomes
        </span>
        {pathname !== "/about-me" && (
          <span className="text-xs text-secondary-foreground underline opacity-50">
            <ViewTransitionLink href="/about-me">
              {t("link")}
            </ViewTransitionLink>
          </span>
        )}
      </div>
    </footer>
  );
}
