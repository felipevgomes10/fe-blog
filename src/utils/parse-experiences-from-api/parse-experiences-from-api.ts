import { api } from "@/lib/api";

type ApiRole = {
  title: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

type ApiCertificate = {
  name: string;
  imageUrl: string;
  certificateUrl: string;
};

type ApiExperienceResponse = {
  experiences: {
    companyName: string;
    companyImageUrl: string;
    location: string;
    roles: ApiRole[];
  }[];
  certificates: ApiCertificate[];
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

export type Certificate = {
  name: string;
  imageUrl: string;
  certificateUrl: string;
};

type ParseExperiencesFromApiParams = {
  experiences?: Experience[];
  certificates?: Certificate[];
};

export async function parseExperiencesFromApi({
  download_url,
}: ApiExperience): Promise<ParseExperiencesFromApiParams> {
  const response = await api(download_url);
  const { experiences = [], certificates = [] }: ApiExperienceResponse =
    await response.json();

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

  const parsedCertificates = certificates.map(
    ({ name, imageUrl, certificateUrl }) => ({
      name,
      imageUrl,
      certificateUrl,
    }),
  );

  return { experiences: parsedExperiences, certificates: parsedCertificates };
}
