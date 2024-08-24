import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { supportedLocales } from "./supported-locales";

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLocales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
