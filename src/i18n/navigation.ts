import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { supportedLocales } from "./supported-locales";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: supportedLocales });
