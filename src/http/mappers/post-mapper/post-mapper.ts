import { getMarkdownMetadata } from "@/utils/get-markdown-metadata/get-markdown-metadata";

export type MappedPost = {
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: string;
};

type PostInfo = [string, string, string];

type IPostMapperMapParams = {
  name: string;
  content: string;
};

interface IPostMapper {
  map: (params: IPostMapperMapParams) => MappedPost;
}

export class PostMapper implements IPostMapper {
  private constructor() {
    this.map = this.map.bind(this);
  }

  static create(): IPostMapper {
    return new PostMapper();
  }

  map({ name, content }: IPostMapperMapParams): MappedPost {
    const slug = this.getPostSlug(name);
    const { title, description, thumbnail } = this.getPostInformation(content);

    return {
      slug,
      title,
      description,
      content,
      thumbnail,
    };
  }

  private getPostSlug(name: string): string {
    const slug = name.split(".").at(0) as string;

    return slug;
  }

  private getPostInformation(
    content: string,
  ): Omit<MappedPost, "slug" | "content"> {
    const postInformation = getMarkdownMetadata(content);
    const [title, description, thumbnail] = postInformation as PostInfo;

    return { title, description, thumbnail };
  }
}
