export const defaultLocale = "en";

export const supportedLocales = [defaultLocale, "pt"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];
