"use client";

import { usePathname } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ViewTransitionLink } from "./view-transition-link";

export function HomeLink() {
  const t = useTranslations("app_header");
  const pathname = usePathname();
  const search = useSearchParams();

  return (
    <ViewTransitionLink
      className={
        "mr-auto flex scroll-m-20 items-center gap-2 text-2xl font-extrabold tracking-tight data-[disabled=true]:pointer-events-none lg:text-3xl"
      }
      data-disabled={pathname === "/"}
      href={`/?${search.toString()}`}
      prefetch
    >
      <ChevronLeft
        className="app-header-icon h-6 w-6 data-[hidden=true]:hidden"
        data-hidden={pathname === "/"}
      />
      <span className="app-header-text">{t("title")}</span>
    </ViewTransitionLink>
  );
}
