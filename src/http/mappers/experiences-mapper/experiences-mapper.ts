import type {
  ApiCertificate,
  ApiExperience,
  ApiExperienceResponse,
  ApiRole,
} from "@/http/services/experiences-service/experiences-service";

type MappedRole = {
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
};

export type MappedExperience = {
  companyName: string;
  companyImageUrl: string;
  location: string;
  roles: MappedRole[];
};

export type MappedCertificate = {
  name: string;
  imageUrl: string;
  certificateUrl: string;
};

type MappedExperiences = {
  experiences?: MappedExperience[];
  certificates?: MappedCertificate[];
};

interface IExperiencesMapper {
  map: (apiExperience: ApiExperienceResponse) => MappedExperiences;
}

export class ExperiencesMapper implements IExperiencesMapper {
  private constructor() {
    this.map = this.map.bind(this);
    this.mapExperience = this.mapExperience.bind(this);
  }

  static create(): IExperiencesMapper {
    return new ExperiencesMapper();
  }

  map({
    experiences = [],
    certificates = [],
  }: ApiExperienceResponse): MappedExperiences {
    const mappedExperiences: MappedExperiences = {
      experiences: experiences.map(this.mapExperience),
      certificates: certificates.map(this.mapCertificate),
    };

    return mappedExperiences;
  }

  private mapExperience({
    companyName,
    companyImageUrl,
    location,
    roles,
  }: ApiExperience): MappedExperience {
    return {
      companyName,
      companyImageUrl,
      location,
      roles: roles.map(this.mapRole),
    };
  }

  private mapRole({
    title,
    startDate,
    endDate,
    description,
  }: ApiRole): MappedRole {
    return {
      title,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      description,
    };
  }

  private mapCertificate({
    name,
    imageUrl,
    certificateUrl,
  }: ApiCertificate): MappedCertificate {
    return {
      name,
      imageUrl,
      certificateUrl,
    };
  }
}
