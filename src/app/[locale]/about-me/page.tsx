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
import type { SupportedLocale } from "@/i18n/supported-locales";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type AboutMeProps = {
  params: {
    locale: SupportedLocale;
  };
};

const logos = ["/js.svg", "/ts.svg", "/node.svg", "/react.svg"] as const;

export default async function Page({
  params: { locale },
}: Readonly<AboutMeProps>) {
  const t = await getTranslations({ locale, namespace: "about_me" });

  return (
    <section className="grid grid-cols-[24rem_1fr]">
      <aside className="px-12 py-6">
        <Card className="sticky top-[75px]">
          <CardHeader className="flex items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className="object-cover"
                src="https://utfs.io/a/oqi3glmmqm/WfWc1HX19bacCQvsmLTaX5dEIymQOcWnfbr6aY3zvGT91utx"
              />
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
      <div></div>
    </section>
  );
}
