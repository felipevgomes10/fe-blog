import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";

type PageNotFoundProps = {
  title: string;
  message: string;
  back: string;
};

export function PageNotFound({
  title,
  message,
  back,
}: Readonly<PageNotFoundProps>) {
  return (
    <section className="grid grid-rows-2 place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-accent-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base leading-7">{message}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button variant="link" asChild>
            <Link href="/">{back}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
