import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("not_found");

  return (
    <section className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-accent-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-base leading-7">{t("message")}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button variant="link" asChild>
            <Link href="/">{t("back")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
