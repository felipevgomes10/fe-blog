import type { MappedExperience } from "@/http/mappers/experiences-mapper/experiences-mapper";
import { formatDate } from "@/utils/format-date/format-date";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

type ExperiencesProps = {
  experiences: MappedExperience[];
};

export async function Experiences({ experiences }: Readonly<ExperiencesProps>) {
  const [t, locale] = await Promise.all([
    getTranslations("about_me"),
    getLocale(),
  ]);

  return (
    <div className="not-prose flex flex-col gap-12">
      {React.Children.toArray(
        experiences.map((experience) => {
          const { companyName, companyImageUrl, location, roles } = experience;

          return (
            <div>
              <div className="mb-2 flex items-start gap-2">
                <Image
                  src={companyImageUrl}
                  alt={companyName}
                  width={40}
                  height={40}
                  className="rounded-sm"
                />

                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-semibold leading-none text-accent-foreground">
                    {companyName}
                  </h4>
                  <span className="prose-slate text-sm leading-none opacity-50 dark:prose-invert">
                    {location}
                  </span>
                </div>
              </div>

              <ul className="ml-8 flex list-disc flex-col gap-2">
                {React.Children.toArray(
                  roles.map(({ title, startDate, endDate, description }) => (
                    <li className="pl-4">
                      <h5 className="prose-slate text-base font-medium leading-none dark:prose-invert">
                        {title}
                      </h5>
                      <span className="prose-slate text-sm leading-none opacity-50 dark:prose-invert">
                        {formatDate(startDate, locale)}
                        {" - "}
                        {endDate ? formatDate(endDate, locale) : t("now")}
                      </span>
                      {description && (
                        <p className="prose-slate mt-2 text-sm dark:prose-invert">
                          {description}
                        </p>
                      )}
                    </li>
                  )),
                )}
              </ul>
            </div>
          );
        }),
      )}
    </div>
  );
}
