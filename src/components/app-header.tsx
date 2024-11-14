"use client";

import { usePathname } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import { ThemeToggle } from "./ui/theme-toggle";
import { ViewTransitionLink } from "./view-transition-link";

export function AppHeader() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div className="app-header sticky top-0 z-50 bg-background px-6 py-4">
      <nav className="m-auto flex w-full max-w-screen-xl flex-wrap items-center justify-start gap-4 py-4 sm:flex-nowrap">
        <ViewTransitionLink
          className={
            "mr-auto flex scroll-m-20 items-center gap-2 text-2xl font-extrabold tracking-tight data-[disabled=true]:pointer-events-none lg:text-3xl"
          }
          data-disabled={pathname === "/"}
          href="/"
        >
          <ChevronLeft
            className="app-header-icon h-6 w-6 data-[hidden=true]:hidden"
            data-hidden={pathname === "/"}
          />
          <span className="app-header-text">{t("app_header.title")}</span>
        </ViewTransitionLink>
        <div className="flex w-full gap-4 sm:w-auto">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
