"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import { ThemeToggle } from "./ui/theme-toggle";

export function AppHeader() {
  const pathname = usePathname();
  const t = useTranslations("app_header");

  return (
    <div className="sticky top-0 z-50 bg-background">
      <nav className="m-auto flex w-full max-w-screen-xl flex-wrap items-center justify-start gap-4 py-4 sm:flex-nowrap">
        <h1 className="mr-auto scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          {pathname !== "/" && <Link href="/">{t("title")}</Link>}
          {pathname === "/" && t("title")}
        </h1>
        <div className="flex w-full gap-4 sm:w-auto">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
