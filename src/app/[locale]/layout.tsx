import { AppHeader } from "@/components/app-header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ViewTransition } from "@/components/view-transition";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Themes } from "@/contexts/theme-provider.types";
import { supportedLocales } from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";

import "../globals.css";

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
    keywords: ["Next.js", "React", "Javascript", "Typescript", "Node"],
  };
}

export const revalidate = 3600; // Every hour

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ViewTransition>
            <ThemeProvider
              attribute="class"
              defaultTheme={Themes.System}
              enableSystem
              disableTransitionOnChange
            >
              <AppHeader />
              <div className="grid min-h-[calc(100dvh_-_104px)] grid-rows-[max-content_1fr] gap-4 px-6">
                <main>{children}</main>
                <Footer />
              </div>
              <Toaster richColors closeButton />
            </ThemeProvider>
          </ViewTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
