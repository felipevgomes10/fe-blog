import { Experiences } from "@/components/experiences";
import { Markdown } from "@/components/markdown";
import { ProfileCard } from "@/components/profile-card";
import { getAboutMe } from "@/data/get-about-me";
import { getExperiences } from "@/data/get-experiences";
import { env } from "@/env/env";
import {
  supportedLocales,
  type SupportedLocale,
} from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

type Params = {
  locale: SupportedLocale;
};

type GenerateMetadata = {
  params: Params;
};

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

export async function generateMetadata({
  params: { locale },
}: GenerateMetadata): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const title = `${t("metadata.title")} - ${t("about_me.link")}`;
  const description = t("about_me.bio_2");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${env.server.VERCEL_URL}/${locale}/about-me`,
    },
  };
}

export default async function Page({
  params: { locale },
}: Readonly<AboutMeProps>) {
  unstable_setRequestLocale(locale);

  const [t, aboutMe, experiences] = await Promise.all([
    getTranslations("about_me"),
    getAboutMe(),
    getExperiences(),
  ]);

  if (!aboutMe) return redirect(`/${locale}/not-found`);

  return (
    <section className="m-auto grid max-w-screen-xl gap-10 md:grid-cols-[max-content_1fr]">
      <aside>
        <ProfileCard profile={aboutMe.profile} />
      </aside>
      <div className="prose prose-slate dark:prose-invert lg:prose-xl">
        <Markdown content={aboutMe.content} />
        {experiences && (
          <div>
            <h2>{t("experience_title")}</h2>
            <Experiences experiences={experiences} />
          </div>
        )}
      </div>
    </section>
  );
}
