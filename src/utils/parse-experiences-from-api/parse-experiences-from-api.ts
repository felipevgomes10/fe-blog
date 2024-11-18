import { api } from "@/lib/api";

type ApiRole = {
  title: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

type ApiExperienceResponse = {
  experiences: {
    companyName: string;
    companyImageUrl: string;
    location: string;
    roles: ApiRole[];
  }[];
};

export type ApiExperience = {
  download_url: string;
};

type Role = {
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
};

export type Experience = {
  companyName: string;
  companyImageUrl: string;
  location: string;
  roles: Role[];
};

export async function parseExperiencesFromApi({
  download_url,
}: ApiExperience): Promise<Experience[]> {
  const response = await api(download_url);
  const { experiences }: ApiExperienceResponse = await response.json();

  const parsedExperiences = experiences.map(
    ({ companyName, companyImageUrl, location, roles }) => {
      const parsedRoles = roles.map(
        ({ title, startDate, endDate, description }) => {
          return {
            title: title,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : undefined,
            description,
          };
        },
      );

      return {
        companyName,
        companyImageUrl,
        location,
        roles: parsedRoles,
      };
    },
  );

  return parsedExperiences;
}
