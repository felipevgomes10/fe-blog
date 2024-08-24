"use client";

import { useLocale, useTranslations } from "next-intl";
import Error from "next/error";

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations("not_found");

  return (
    <html lang={locale}>
      <body>
        <Error title={t("title")} statusCode={404} />
      </body>
    </html>
  );
}
