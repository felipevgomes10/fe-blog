import { Markdown } from "@/components/markdown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAboutMe } from "@/data/get-about-me";
import {
  supportedLocales,
  type SupportedLocale,
} from "@/i18n/supported-locales";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";

type AboutMeProps = {
  params: {
    locale: SupportedLocale;
  };
};

const logos = ["/js.svg", "/ts.svg", "/node.svg", "/react.svg"] as const;

export const revalidate = 3600; // Every hour

export async function generateStaticParams() {
  const params = supportedLocales.map((locale) => ({ locale }));

  return params;
}

export default async function Page({
  params: { locale },
}: Readonly<AboutMeProps>) {
  const [t, aboutMe] = await Promise.all([
    getTranslations({ locale, namespace: "about_me" }),
    getAboutMe(),
  ]);

  if (!aboutMe) return redirect(`/${locale}/not-found`);

  return (
    <section className="m-auto grid max-w-screen-xl grid-cols-[max-content_1fr] gap-10">
      <aside>
        <Card className="sticky top-[75px] max-w-72">
          <CardHeader className="flex items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage className="object-cover" src={aboutMe.profile} />
            </Avatar>
            <CardTitle>Felipe Gomes</CardTitle>
            <CardDescription className="text-center">
              {t("bio")}
            </CardDescription>
          </CardHeader>
          <Separator className="mx-auto mb-5 w-[80%]" />
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">{t("bio_2")}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-4">
            {logos.map((logo) => (
              <Image key={logo} src={logo} alt={logo} width={20} height={20} />
            ))}
          </CardFooter>
        </Card>
      </aside>
      <div className="prose prose-slate dark:prose-invert lg:prose-xl">
        <Markdown content={aboutMe.content} />
      </div>
    </section>
  );
}
