import { Markdown } from "@/components/markdown";
import { ProfileCard } from "@/components/profile-card";
import { getAboutMe } from "@/data/get-about-me";
import {
  supportedLocales,
  type SupportedLocale,
} from "@/i18n/supported-locales";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

type AboutMeProps = {
  params: {
    locale: SupportedLocale;
  };
};

export const revalidate = 3600; // Every hour

export async function generateStaticParams() {
  const params = supportedLocales.map((locale) => ({ locale }));

  return params;
}

export default async function Page({
  params: { locale },
}: Readonly<AboutMeProps>) {
  unstable_setRequestLocale(locale);

  const [t, aboutMe] = await Promise.all([
    getTranslations({ locale, namespace: "about_me" }),
    getAboutMe(),
  ]);

  if (!aboutMe) return redirect(`/${locale}/not-found`);

  return (
    <section className="m-auto grid max-w-screen-xl gap-10 md:grid-cols-[max-content_1fr]">
      <aside>
        <ProfileCard profile={aboutMe.profile} />
      </aside>
      <div className="prose prose-slate dark:prose-invert lg:prose-xl">
        <Markdown content={aboutMe.content} />
      </div>
    </section>
  );
}
