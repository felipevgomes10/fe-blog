import createMiddleware from "next-intl/middleware";
import { defaultLocale, supportedLocales } from "./i18n/supported-locales";

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale: defaultLocale,
});

export const config = {
  matcher: ["/", "/(en|pt)/:path*"],
};
