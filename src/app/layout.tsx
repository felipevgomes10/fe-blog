import { ThemeProvider } from "@/contexts/theme-provider";
import { Themes } from "@/contexts/theme-provider.types";
import { supportedLocales } from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { Inter } from "next/font/google";
import "./globals.css";

type GenerateMetadata = {
  params: { locale: string };
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: GenerateMetadata): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme={Themes.System}
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
