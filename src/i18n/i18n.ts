import { getRequestConfig } from "next-intl/server";
import { redirect, RedirectType } from "next/navigation";
import { supportedLocales } from "./supported-locales";

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLocales.includes(locale as (typeof supportedLocales)[number])) {
    redirect("/en/not-found", RedirectType.replace);
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
