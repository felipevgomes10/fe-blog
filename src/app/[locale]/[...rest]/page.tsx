"use client";

import { useTranslations } from "next-intl";
import Error from "next/error";

export default function NotFound() {
  const t = useTranslations("not_found");

  return <Error title={t("title")} statusCode={404} />;
}
