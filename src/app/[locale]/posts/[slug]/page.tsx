import { Article } from "@/components/article";
import { unstable_setRequestLocale } from "next-intl/server";

type PostProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateStaticParams() {
  return [];
}

export default function Post({
  params: { locale, slug },
}: Readonly<PostProps>) {
  unstable_setRequestLocale(locale);

  return <Article slug={slug} locale={locale} />;
}
