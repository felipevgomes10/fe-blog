"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import { ThemeToggle } from "./ui/theme-toggle";

export function AppHeader() {
  const pathname = usePathname();
  const t = useTranslations("app_header");

  return (
    <div className="sticky z-50 top-0 bg-background">
      <nav className="flex justify-start items-center flex-wrap sm:flex-nowrap gap-4 max-w-screen-xl w-full m-auto py-4">
        <h1 className="mr-auto scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          {pathname !== "/" && <Link href="/">{t("title")}</Link>}
          {pathname === "/" && t("title")}
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
