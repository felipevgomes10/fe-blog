import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import React from "react";

const mockedPosts = [
  {
    title: "Post 1",
    content: "This is the content of post 1",
  },
  {
    title: "Post 2",
    content: "This is the content of post 2",
  },
  {
    title: "Post 3",
    content: "This is the content of post 3",
  },
  {
    title: "Post 4",
    content: "This is the content of post 4",
  },
  {
    title: "Post 5",
    content: "This is the content of post 5",
  },
];

export default function Home() {
  return (
    <section className="flex flex-col gap-4 max-w-screen-xl m-auto w-full h-full">
      {React.Children.toArray(
        mockedPosts.map((post) => (
          <Card>
            <CardHeader className="px-9">
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-9">
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam, porro. Nisi officia odio illum, odit provident
                obcaecati sequi! Recusandae mollitia tempore fugit maxime sint
                magnam ut tempora voluptates sit officia.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="link" asChild>
                <Link href="/posts/slug">Read more</Link>
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </section>
  );
}
