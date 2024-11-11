import { PageNotFound } from "@/components/page-not-found";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("not_found");

  return (
    <PageNotFound title={t("title")} message={t("message")} back={t("back")} />
  );
}
