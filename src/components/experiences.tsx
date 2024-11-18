import { formatDate } from "@/utils/format-date/format-date";
import type { Experience } from "@/utils/parse-experiences-from-api/parse-experiences-from-api";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

type ExperiencesProps = {
  experiences: Experience[];
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
                  <h4 className="text-lg leading-none text-accent-foreground">
                    {companyName}
                  </h4>
                  <span className="text-sm leading-none text-secondary-foreground opacity-50">
                    {location}
                  </span>
                </div>
              </div>

              <ul className="ml-8 flex list-disc flex-col gap-2">
                {React.Children.toArray(
                  roles.map(
                    ({ title, startDate, endDate, description }, index) => (
                      <li>
                        <h5 className="text-base leading-none text-accent-foreground">
                          {title}
                        </h5>
                        <span className="text-sm leading-none text-secondary-foreground opacity-50">
                          {formatDate(startDate, locale)}
                          {" - "}
                          {endDate ? formatDate(endDate, locale) : t("now")}
                        </span>
                        <p>{description}</p>
                      </li>
                    ),
                  ),
                )}
              </ul>
            </div>
          );
        }),
      )}
    </div>
  );
}
