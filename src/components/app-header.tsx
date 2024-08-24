"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import { ThemeToggle } from "./ui/theme-toggle";

type AppHeaderProps = {};

export function AppHeader(props: AppHeaderProps) {
  const pathname = usePathname();
  const t = useTranslations("app_header");

  return (
    <nav className="flex justify-start items-center gap-4">
      <h1 className="mr-auto scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        {pathname !== "/" && <Link href="/">{t("title")}</Link>}
        {pathname === "/" && t("title")}
      </h1>
      <LocaleSwitcher />
      <ThemeToggle />
    </nav>
  );
}