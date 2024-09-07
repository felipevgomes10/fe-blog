"use client";

import { usePathname } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import { ThemeToggle } from "./ui/theme-toggle";
import { ViewTransitionLink } from "./view-transition-link";

export function AppHeader() {
  const pathname = usePathname();
  const t = useTranslations("app_header");

  return (
    <div className="app-header sticky top-0 z-50 bg-background">
      <nav className="m-auto flex w-full max-w-screen-xl flex-wrap items-center justify-start gap-4 py-4 sm:flex-nowrap">
        {pathname !== "/" && <ChevronLeft className="h-6 w-6" />}
        <ViewTransitionLink
          className={
            "app-header-text mr-auto flex scroll-m-20 items-center gap-2 text-2xl font-extrabold tracking-tight data-[disabled=true]:pointer-events-none lg:text-3xl"
          }
          data-disabled={pathname === "/"}
          href="/"
        >
          {t("title")}
        </ViewTransitionLink>
        <div className="flex w-full gap-4 sm:w-auto">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
