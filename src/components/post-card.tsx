"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ViewTransitionLink } from "./view-transition-link";

type PostCardProps = {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
};

export function PostCard({
  slug,
  title,
  description,
  thumbnail,
}: Readonly<PostCardProps>) {
  const t = useTranslations("post_card");
  const search = useSearchParams();

  return (
    <Card className="flex flex-col items-center justify-start overflow-hidden transition-all hover:-translate-y-1 hover:border-accent-foreground hover:shadow-md md:flex-row">
      {thumbnail && (
        <div className="relative h-60 max-h-60 w-full max-w-full md:h-full md:max-w-60">
          <Image src={thumbnail} alt={title} quality={50} fill />
        </div>
      )}
      <div>
        <CardHeader className="px-9">
          <CardTitle className="capitalize">{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-9">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button variant="link" asChild>
            <ViewTransitionLink
              href={`/posts/${slug}?${search.toString()}`}
              prefetch
            >
              {t("read_more")}
            </ViewTransitionLink>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
