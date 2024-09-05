import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
  return (
    <Card className="flex flex-col items-center justify-start overflow-hidden transition-all hover:-translate-y-1 hover:border-r-4 hover:border-r-accent-foreground hover:shadow-md md:flex-row">
      {thumbnail && (
        <Image
          className="max-h-60 max-w-full object-cover object-center md:max-w-60"
          src={thumbnail}
          alt={title}
          width={200}
          height={200}
          layout="responsive"
          quality={75}
        />
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
            <Link href={`/posts/${slug}`}>Read more</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
