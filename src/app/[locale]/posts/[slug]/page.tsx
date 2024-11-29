import { Markdown } from "@/components/markdown";
import { PageNotFound } from "@/components/page-not-found";
import { ScrollProgress } from "@/components/scroll-progress";
import { getPost } from "@/data/get-post";
import { getPosts } from "@/data/get-posts";
import { env } from "@/env/env";
import { routing } from "@/i18n/navigation";
import { type SupportedLocale } from "@/i18n/supported-locales";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

type Params = Promise<{ locale: SupportedLocale; slug: string }>;

type GenerateMetadata = {
  params: Params;
};

type PostProps = {
  params: Params;
};

export const revalidate = 3600; // Every hour

export async function generateStaticParams() {
  const posts = await getPosts();

  const params = posts.flatMap(({ slug }) => {
    const postByLocales = routing.locales.map((locale) => ({
      locale,
      slug,
    }));

    return postByLocales;
  });

  return params;
}

export async function generateMetadata({
  params,
}: GenerateMetadata): Promise<Metadata> {
  const { locale, slug } = await params;

  const [t, post] = await Promise.all([
    getTranslations({ locale }),
    getPost(slug),
  ]);

  if (!post) {
    return {
      title: t("post.not_found.title"),
      description: t("post.not_found.message"),
    };
  }

  const title = `${t("metadata.title")} - ${post.title}`;
  const description = post.description;

  return {
    title,
    description,
    openGraph: {
      title,
      siteName: t("metadata.title"),
      description,
      images: post.thumbnail,
      url: `https://${env.server.VERCEL_URL}/${locale}/posts/${slug}`,
    },
    twitter: {
      card: "summary",
    },
  };
}

export default async function Post({ params }: Readonly<PostProps>) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [t, post] = await Promise.all([
    getTranslations({ locale, namespace: "post.not_found" }),
    getPost(slug),
  ]);

  if (!post) {
    return (
      <PageNotFound
        title={t("title")}
        message={t("message")}
        back={t("back")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ScrollProgress />
      {post.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden rounded-md md:h-96 lg:h-[500px]">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            quality={75}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div
        className="m-auto min-h-screen max-w-max rounded-md bg-background sm:p-6 data-[translate=true]:sm:max-w-[95%] data-[translate=true]:sm:-translate-y-52 lg:data-[translate=true]:max-w-max lg:data-[translate=true]:p-12"
        data-translate={!!post.thumbnail}
      >
        <article className="prose prose-slate dark:prose-invert lg:prose-xl">
          <Markdown content={post.content} />
        </article>
      </div>
    </div>
  );
}
