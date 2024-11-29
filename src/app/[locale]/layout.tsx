import { AppHeader } from "@/components/app-header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ViewTransition } from "@/components/view-transition";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Themes } from "@/contexts/theme-provider.types";
import { env } from "@/env/env";
import { routing } from "@/i18n/navigation";
import { type SupportedLocale } from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { redirect, RedirectType } from "next/navigation";

import "../globals.css";

type Params = Promise<{ locale: SupportedLocale }>;

type GenerateMetadata = {
  params: Params;
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Params;
}>;

export const revalidate = 3600; // Every hour

export async function generateMetadata({
  params,
}: GenerateMetadata): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    keywords: ["Next.js", "React", "Javascript", "Typescript", "Node"],
    openGraph: {
      title,
      siteName: title,
      description,
      images:
        "https://utfs.io/a/oqi3glmmqm/WfWc1HX19bacvYTy6Ue2dKHD6yEGkfzSwVsY1mrpnT80XQ5R",
      url: `https://${env.server.VERCEL_URL}/${locale}`,
    },
    twitter: {
      card: "summary",
    },
  };
}

export function generateStaticParams() {
  const params = routing.locales.map((locale) => ({ locale }));

  return params;
}

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    redirect("/en/not-found", RedirectType.replace);
  }

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
