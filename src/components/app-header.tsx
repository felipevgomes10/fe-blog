import { getPosts } from "@/data/get-posts";
import type { SupportedLocale } from "@/i18n/supported-locales";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";
import { HomeLink } from "./home-link";
import LocaleSwitcher from "./locale-switcher";
import { Search } from "./search";
import { ThemeToggle } from "./ui/theme-toggle";

export async function AppHeader() {
  const locale = await getLocale();

  const postsPromise = getPosts(locale as SupportedLocale);

  return (
    <div className="app-header sticky top-0 z-50 bg-background px-6 py-4">
      <nav className="m-auto flex w-full max-w-screen-xl flex-wrap items-center justify-start gap-4 py-4 sm:flex-nowrap">
        <HomeLink />
        <div className="flex w-full gap-4 sm:w-auto">
          <Suspense>
            <Search postsPromise={postsPromise} />
          </Suspense>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
