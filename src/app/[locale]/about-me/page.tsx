import { CertificatesCarousel } from "@/components/certificates-carousel";
import { CopyableLink } from "@/components/copyable-link";
import { Experiences } from "@/components/experiences";
import { Markdown } from "@/components/markdown";
import { ProfileCard } from "@/components/profile-card";
import { getAboutMe } from "@/data/get-about-me";
import { getExperiences } from "@/data/get-experiences";
import { env } from "@/env/env";
import { routing } from "@/i18n/navigation";
import { type SupportedLocale } from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

type Params = Promise<{ locale: SupportedLocale }>;

type GenerateMetadata = {
  params: Params;
};

type AboutMeProps = {
  params: Params;
};

export const revalidate = 3600; // Every hour

export async function generateStaticParams() {
  const params = routing.locales.map((locale) => ({ locale }));

  return params;
}

export async function generateMetadata({
  params,
}: GenerateMetadata): Promise<Metadata> {
  const { locale } = await params;
  const [t, aboutMe] = await Promise.all([
    getTranslations({ locale }),
    getAboutMe(),
  ]);

  const title = `${t("metadata.title")} - ${t("about_me.link")}`;
  const description = t("about_me.bio_2");

  return {
    title,
    description,
    openGraph: {
      title,
      siteName: t("metadata.title"),
      description,
      images: aboutMe.profile,
      url: `https://${env.server.VERCEL_URL}/${locale}/about-me`,
    },
    twitter: {
      card: "summary",
    },
  };
}

export default async function Page({ params }: Readonly<AboutMeProps>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, aboutMe, myExperiences] = await Promise.all([
    getTranslations("about_me"),
    getAboutMe(),
    getExperiences(),
  ]);

  if (!aboutMe) return redirect(`/${locale}/not-found`);

  return (
    <section className="m-auto grid max-w-screen-xl gap-10 md:grid-cols-[max-content_1fr]">
      <aside className="sm:pl-[0.625rem]">
        <ProfileCard profile={aboutMe.profile} />
      </aside>
      <div className="prose prose-slate dark:prose-invert lg:prose-xl">
        <Markdown content={aboutMe.content} />
        {myExperiences?.experiences && myExperiences.experiences.length > 0 && (
          <div>
            <CopyableLink id="experiences">
              <h2 id="experiences">{t("experience_title")}</h2>
            </CopyableLink>
            <Experiences experiences={myExperiences.experiences} />
          </div>
        )}
        {myExperiences?.certificates &&
          myExperiences.certificates.length > 0 && (
            <div>
              <CopyableLink id="certificates">
                <h2 id="certificates">{t("certificates_title")}</h2>
              </CopyableLink>
              <CertificatesCarousel certificates={myExperiences.certificates} />
            </div>
          )}
      </div>
    </section>
  );
}
