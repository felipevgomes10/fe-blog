import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { defaultLocale, supportedLocales } from "./supported-locales";

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
